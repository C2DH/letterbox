import { useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { Collaspsable } from '../components/Collapsable';
import { AddressCard } from '../components/items/card/AddressCard';
import { CompanyCard } from '../components/items/card/CompanyCard';
import { CountryCard } from '../components/items/card/CountryCard';
import { PersonCard } from '../components/items/card/PersonCard';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { type GetMessageByIdQuery } from '../core/graphql';
import { useGetMessageById } from '../hooks/useMessage';
import { Layout } from './layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = { title: string } & ListWithLoadMoreProps<T>;

export const MessageView: FC = () => {
  const { id } = useParams();
  const { loading, message, fetchCompanies, fetchCountries, fetchPeople, fetchAddresses } =
    useGetMessageById(id);

  const breadcrumbItems = useMemo(
    () => [{ content: 'Message' }, { content: message?.id || '' }],
    [message?.id],
  );

  const relatedItems: Array<RelatedDefinition> = message
    ? [
        {
          title: `Companies (${message.companiesCount})`,
          data: message.companies,
          total: message.companiesCount,
          fetch: fetchCompanies,
          getItemKey: (n) => n.id,
          renderItem: (company) => (
            <div className="col">
              <CompanyCard data={company} />
            </div>
          ),
        } as RelatedDefinition<GetMessageByIdQuery['result'][0]['companies'][0]>,
        {
          title: `Countries (${message.countriesCount})`,
          data: message.countries,
          total: message.countriesCount,
          fetch: fetchCountries,
          getItemKey: (country) => country.id,
          renderItem: (country) => (
            <div className="col">
              <CountryCard data={country} />
            </div>
          ),
        } as RelatedDefinition<GetMessageByIdQuery['result'][0]['countries'][0]>,
        {
          title: `Address (${message.addressesCount})`,
          data: message.addresses,
          total: message.addressesCount,
          fetch: fetchAddresses,
          getItemKey: (n) => n.id,
          renderItem: (n) => (
            <div className="col">
              <AddressCard data={n} />
            </div>
          ),
        } as RelatedDefinition<GetMessageByIdQuery['result'][0]['addresses'][0]>,
        {
          title: `People (${message.peopleCount})`,
          data: message.people,
          total: message.peopleCount,
          fetch: fetchPeople,
          getItemKey: (n) => n.id,
          renderItem: (person) => (
            <div className="col">
              <PersonCard data={person} />
            </div>
          ),
        } as RelatedDefinition<GetMessageByIdQuery['result'][0]['people'][0]>,
      ]
    : [];

  return (
    <Layout loading={loading}>
      <Breadcrumb items={breadcrumbItems} />
      {message && (
        <>
          <h1>Message {message?.id}</h1>

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
