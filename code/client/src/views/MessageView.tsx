import { useMemo, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
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
            <div>
              <Link to={`/company/${company.id}`}>{company.name}</Link>
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
            <div>
              <Link to={`/country/${country.id}`}>{country.name}</Link>
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
            <div>
              <Link to={`/address/${n.id}`}>{n.name}</Link>
            </div>
          ),
        } as RelatedDefinition<GetMessageByIdQuery['result'][0]['addresses'][0]>,
        {
          title: `People (${message.peopleCount})`,
          data: message.people,
          total: message.peopleCount,
          fetch: fetchPeople,
          getItemKey: (n) => n.id,
          renderItem: (n) => (
            <div>
              <Link to={`/person/${n.id}`}>{n.id}</Link>
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
