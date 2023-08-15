'use client';

import './style.css';
 
import { debounce } from 'lodash';
import { useCallback, useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
 
export default function Search({ route }: {route: string}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const router = useRouter();
  
  const updateRoute = debounce(() => {
    router.push(`/${route}?search=${search}`); 
  }, 400);

  useEffect(() => {
    // Don't bother updating if search hasn't changed. This will
    // most likely only happen on initial render. 
    if (searchParams.get('search') != search) updateRoute();
  }, [search]);

  return (
    <div className="search">
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
