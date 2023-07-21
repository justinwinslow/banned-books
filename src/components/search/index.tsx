'use client';

import './style.css';
 
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function Search({ route }) {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const updateRoute = debounce(function() {
    router.push(`/${route}?search=${search}`);
  }, 300);

  useEffect(updateRoute, [search]);

  return (
    <div className="global-search">
      <input 
        value={search} 
        type="text" 
        name="search" 
        placeholder="Search by title" 
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
