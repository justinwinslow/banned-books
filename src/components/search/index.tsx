'use client'

import './style.css';
 
import { useCallback } from 'react';
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
  )

  function search(event) {
    console.log(event.target.value);
    router.push(`/${route}?` + createQueryString('search', event.target.value));
  }

  return (
    <div className="global-search">
      <input type="text" name="search" placeholder="Search" onChange={search} />
    </div>
  )
}
