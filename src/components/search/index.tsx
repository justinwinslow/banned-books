'use client';

import './style.css';
 
import { debounce } from 'lodash';
import { useCallback, useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
 
export default function Search({ route }: {route: string}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const router = useRouter();
  const updateRoute = debounce(function() {
    router.push(`/${route}?search=${search}`);
  }, 400);

  useEffect(updateRoute, [search]);

  return (
    <div className="global-search">
      <input 
        value={search} 
        type="text" 
        name="search" 
        placeholder="Search by title or author" 
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
