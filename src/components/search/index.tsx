'use client'

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

  console.log('search', searchParams.get('search'));

  useEffect(() => {
    console.log('useEffect', searchParams.get('search'));
  }, [searchParams]);

  function search(event) {
    console.log(event.target.value);
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
