'use client';

import './style.css';
 
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
 
export default function Search({ route }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  );

  // useEffect(() => {
  //   console.log('useEffect', searchParams.get('search'));
  // }, [searchParams]);

  function search(event) {
    router.push(`/${route}?` + createQueryString('search', event.target.value));
  }

  const input = (
    <input type="text" name="search" placeholder="Search" onChange={search} />
  )

  return (
    <div className="global-search">
      <input value={searchParams.get('search') || ''} type="text" name="search" placeholder="Search by title" onChange={search} />
    </div>
  )
}
