import {useMemo} from 'react'
import {useClient} from 'sanity'

export function useSanityClient() {
  const client = useClient({apiVersion: '2021-10-21'});
  return useMemo(() => client.withConfig({apiVersion: '2021-10-21'}), [client])
}
