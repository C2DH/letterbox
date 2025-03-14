import { useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { Collaspsable } from '../components/Collapsable';
import { AddressCard } from '../components/items/card/AddressCard';
import { CompanyCard } from '../components/items/card/CompanyCard';
import { MessageCard } from '../components/items/card/MessageCard';
import { PersonCard } from '../components/items/card/PersonCard';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import type { GetCountryByIdQuery } from '../core/graphql';
import { useGetCountryById } from '../hooks/useCountry';
import { Layout } from './layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = { title: string } & ListWithLoadMoreProps<T>;

export const CountryView: FC = () => {
  const { id } = useParams();
  const { loading, country, fetchCompanies, fetchAddresses, fetchMessages, fetchPeople } =
    useGetCountryById(id);

  const breadcrumbItems = useMemo(
    () => [{ content: 'Country' }, { content: country?.name || '' }],
    [country?.name],
  );

  const relatedItems: Array<RelatedDefinition> = country
    ? [
        {
          title: `Companies (${country.companiesCount})`,
          data: country.companies,
          total: country.companiesCount,
          fetch: fetchCompanies,
          getItemKey: (n) => n.id,
          renderItem: (company) => (
            <div className="col">
              <CompanyCard data={company} />
            </div>
          ),
        } as RelatedDefinition<GetCountryByIdQuery['result'][0]['companies'][0]>,
        {
          title: `Address (${country.addressesCount})`,
          data: country.addresses,
          total: country.addressesCount,
          fetch: fetchAddresses,
          getItemKey: (n) => n.id,
          renderItem: (n) => (
            <div className="col">
              <AddressCard data={n} />
            </div>
          ),
        } as RelatedDefinition<GetCountryByIdQuery['result'][0]['addresses'][0]>,
        {
          title: `People (${country.peopleCount})`,
          data: country.people,
          total: country.peopleCount,
          fetch: fetchPeople,
          getItemKey: (person) => person.id,
          renderItem: (person) => (
            <div className="col">
              <PersonCard data={person} />
            </div>
          ),
        } as RelatedDefinition<GetCountryByIdQuery['result'][0]['people'][0]>,
        {
          title: `Messages (${country.messagesCount})`,
          data: country.messages,
          total: country.messagesCount,
          fetch: fetchMessages,
          getItemKey: (msg) => msg.id,
          renderItem: (msg) => (
            <div className="col">
              <MessageCard data={msg} />
            </div>
          ),
        } as RelatedDefinition<GetCountryByIdQuery['result'][0]['messages'][0]>,
      ]
    : [];

  return (
    <Layout loading={loading}>
      <Breadcrumb items={breadcrumbItems} />
      {country && (
        <>
          <h1>Country {country?.name}</h1>

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
