import { useMemo, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { type GetPersonByIdQuery } from '../core/graphql';
import { useGetPersonById } from '../hooks/usePerson';
import { Layout } from './layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = { title: string } & ListWithLoadMoreProps<T>;

export const PersonView: FC = () => {
  const { id } = useParams();
  const { loading, person, fetchCompanies, fetchCountries, fetchMessages, fetchAddresses } =
    useGetPersonById(id);

  const breadcrumbItems = useMemo(
    () => [{ content: 'Person' }, { content: person?.name || '' }],
    [person?.name],
  );

  const relatedItems: Array<RelatedDefinition> = person
    ? [
        {
          title: `Companies (${person.companiesCount})`,
          data: person.companies,
          total: person.companiesCount,
          fetch: fetchCompanies,
          getItemKey: (n) => n.id,
          renderItem: (company) => (
            <div>
              <Link to={`/company/${company.id}`}>{company.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetPersonByIdQuery['result'][0]['companies'][0]>,
        {
          title: `Countries (${person.countriesCount})`,
          data: person.countries,
          total: person.countriesCount,
          fetch: fetchCountries,
          getItemKey: (country) => country.id,
          renderItem: (country) => (
            <div>
              <Link to={`/country/${country.id}`}>{country.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetPersonByIdQuery['result'][0]['countries'][0]>,
        {
          title: `Address (${person.addressesCount})`,
          data: person.addresses,
          total: person.addressesCount,
          fetch: fetchAddresses,
          getItemKey: (n) => n.id,
          renderItem: (n) => (
            <div>
              <Link to={`/address/${n.id}`}>{n.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetPersonByIdQuery['result'][0]['addresses'][0]>,
        {
          title: `Messages (${person.messagesCount})`,
          data: person.messages,
          total: person.messagesCount,
          fetch: fetchMessages,
          getItemKey: (msg) => msg.id,
          renderItem: (msg) => (
            <div>
              <Link to={`/message/${msg.id}`}>{msg.id}</Link>
            </div>
          ),
        } as RelatedDefinition<GetPersonByIdQuery['result'][0]['messages'][0]>,
      ]
    : [];

  return (
    <Layout loading={loading}>
      <Breadcrumb items={breadcrumbItems} />
      {person && (
        <>
          <h1>Person {person?.name}</h1>

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
