'use client';

import './style.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  function doSearch() {
    router.push(`/books?search=${search}`);
  }

  function handleKeyUp(e) {
    if (e.key == 'Enter') doSearch();
  }

  const button = (
    <button onClick={doSearch}>Search</button>
  )

  const input = (
    <input 
      value={search} 
      type="text" 
      placeholder="Search by title" 
      onChange={(e) => setSearch(e.target.value)} 
      onKeyUp={handleKeyUp}
    />
  )

  return (
    <section className="view root">
      <div className="root-search">
        {input}{button}
      </div>
    </section>
  )
}
