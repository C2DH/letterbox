import { useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumb } from '../components/Breadcrumb';
import { Collaspsable } from '../components/Collapsable';
import { AddressCard } from '../components/itemCard/AddressCard';
import { CompanyCard } from '../components/itemCard/CompanyCard';
import { CountryCard } from '../components/itemCard/CountryCard';
import { MessageCard } from '../components/itemCard/MessageCard';
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
            <div className="col">
              <CompanyCard data={company} />
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
            <div className="col">
              <CountryCard data={country} />
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
            <div className="col">
              {' '}
              <AddressCard data={n} />
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
            <div className="col">
              <MessageCard data={msg} />
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
