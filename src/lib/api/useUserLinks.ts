"use client";

import { Link } from "@prisma/client";
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function useUserLinks() {
  const { data, error, isLoading } = useSWR<Link[]>('/api/links', fetcher);
  const { mutate } = useSWRConfig();

  return {
    links: data || [],
    isLoading,
    error,
    mutateLinks: () => mutate('/api/links'), // Export mutate to allow manual revalidation
  };
}

export default useUserLinks;