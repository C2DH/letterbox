import { useMemo, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
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
            <div>
              <Link to={`/company/${company.id}`}>{company.name}</Link>
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
            <div>
              <Link to={`/address/${n.id}`}>{n.name}</Link>
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
            <div>
              <Link to={`/person/${person.id}`}>{person.name}</Link>
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
            <div>
              <Link to={`/message/${msg.id}`}>{msg.id}</Link>
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
                <h3>{related.title}</h3>
                <div className="container">
                  <ListWithLoadMore {...related} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};
