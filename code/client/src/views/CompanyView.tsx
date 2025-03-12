import { useMemo, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { ListWithLoadMore, type ListWithLoadMoreProps } from '../components/ListWithLoadMore';
import { type GetCompanyByIdQuery } from '../core/graphql';
import { useGetCompanyById } from '../hooks/useCompany';
import { Layout } from './layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RelatedDefinition<T = any> = { title: string } & ListWithLoadMoreProps<T>;

export const CompanyView: FC = () => {
  const { id } = useParams();
  const { loading, company, fetchAddresses, fetchCountries, fetchMessages, fetchPeople } =
    useGetCompanyById(id);

  const breadcrumbItems = useMemo(
    () => [{ content: 'Company' }, { content: company?.name || '' }],
    [company?.name],
  );

  const relatedItems: Array<RelatedDefinition> = company
    ? [
        {
          title: `Addresses (${company.addressesCount})`,
          data: company.addresses,
          total: company.addressesCount,
          fetch: fetchAddresses,
          getItemKey: (address) => address.id,
          renderItem: (address) => (
            <div>
              <Link to={`/address/${address.id}`}>{address.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetCompanyByIdQuery['result'][0]['addresses'][0]>,
        {
          title: `Countries (${company.countriesCount})`,
          data: company.countries,
          total: company.countriesCount,
          fetch: fetchCountries,
          getItemKey: (country) => country.id,
          renderItem: (country) => (
            <div>
              <Link to={`/country/${country.id}`}>{country.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetCompanyByIdQuery['result'][0]['countries'][0]>,
        {
          title: `People (${company.peopleCount})`,
          data: company.people,
          total: company.peopleCount,
          fetch: fetchPeople,
          getItemKey: (person) => person.id,
          renderItem: (person) => (
            <div>
              <Link to={`/person/${person.id}`}>{person.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetCompanyByIdQuery['result'][0]['people'][0]>,
        {
          title: `Messages (${company.messagesCount})`,
          data: company.messages,
          total: company.messagesCount,
          fetch: fetchMessages,
          getItemKey: (msg) => msg.id,
          renderItem: (msg) => (
            <div>
              <Link to={`/message/${msg.id}`}>{msg.id}</Link>
            </div>
          ),
        } as RelatedDefinition<GetCompanyByIdQuery['result'][0]['messages'][0]>,
      ]
    : [];

  return (
    <Layout loading={loading}>
      <Breadcrumb items={breadcrumbItems} />
      {company && (
        <>
          <h1>Company {company?.name}</h1>

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
