import { useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { Collaspsable } from '../components/Collapsable';
import { CompanyCard } from '../components/items/card/CompanyCard';
import { CountryCard } from '../components/items/card/CountryCard';
import { MessageCard } from '../components/items/card/MessageCard';
import { PersonCard } from '../components/items/card/PersonCard';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { type GetAddressByIdQuery } from '../core/graphql';
import { useGetAddressById } from '../hooks/useAddress';
import { Layout } from './layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = { title: string } & ListWithLoadMoreProps<T>;

export const AddressView: FC = () => {
  const { id } = useParams();
  const { loading, address, fetchCompanies, fetchCountries, fetchMessages, fetchPeople } =
    useGetAddressById(id);

  const breadcrumbItems = useMemo(
    () => [{ content: 'Address' }, { content: address?.name || '' }],
    [address?.name],
  );

  const relatedItems: Array<RelatedDefinition> = address
    ? [
        {
          title: `Companies (${address.companiesCount})`,
          data: address.companies,
          total: address.companiesCount,
          fetch: fetchCompanies,
          getItemKey: (n) => n.id,
          renderItem: (company) => (
            <div className="col">
              <CompanyCard data={company} />
            </div>
          ),
        } as RelatedDefinition<GetAddressByIdQuery['result'][0]['companies'][0]>,
        {
          title: `Countries (${address.countriesCount})`,
          data: address.countries,
          total: address.countriesCount,
          fetch: fetchCountries,
          getItemKey: (country) => country.id,
          renderItem: (country) => (
            <div className="col">
              <CountryCard data={country} />
            </div>
          ),
        } as RelatedDefinition<GetAddressByIdQuery['result'][0]['countries'][0]>,
        {
          title: `People (${address.peopleCount})`,
          data: address.people,
          total: address.peopleCount,
          fetch: fetchPeople,
          getItemKey: (person) => person.id,
          renderItem: (person) => (
            <div className="col">
              <PersonCard data={person} />
            </div>
          ),
        } as RelatedDefinition<GetAddressByIdQuery['result'][0]['people'][0]>,
        {
          title: `Messages (${address.messagesCount})`,
          data: address.messages,
          total: address.messagesCount,
          fetch: fetchMessages,
          getItemKey: (msg) => msg.id,
          renderItem: (msg) => (
            <div className="col">
              <MessageCard data={msg} />
            </div>
          ),
        } as RelatedDefinition<GetAddressByIdQuery['result'][0]['messages'][0]>,
      ]
    : [];

  return (
    <Layout loading={loading}>
      <Breadcrumb items={breadcrumbItems} />
      {address && (
        <>
          <h1>Address {address?.name}</h1>

          <div className="container">
            <h2>Related items</h2>
            {relatedItems.map((related, index) => (
              <div className="container" key={index}>
                <Collaspsable title={related.title}>
                  <div className="container">
                    <ListWithLoadMore className="row row-cols-1 row-cols-md-3 g-2" {...related} />
                  </div>
                </Collaspsable>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};
