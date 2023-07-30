'use client';

import './style.css';
 
import { debounce } from 'lodash';
import { useCallback, useEffect, useState} from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
 
export default function Search({ route }: {route: string}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const router = useRouter();
  const [initialized, setInitialized] = useState<boolean>(false);
  const updateRoute = debounce(function() {
    if (initialized) {
      router.push(`/${route}?search=${search}`);  
    } else {
      // NOTE - This is a bit of a hacky way to get it to not
      // run on page load
      setInitialized(true);
    }
  }, 400);
  const pathname = usePathname();

  useEffect(updateRoute, [search]);

  if (pathname == '/') {
    return (<></>);
  }
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
