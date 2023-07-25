'use client';

import './style.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  function doSearch() {
    router.push(`/books?search=${search}`);
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key == 'Enter') doSearch();
  }

  const button = (
    <button onClick={doSearch}>Search</button>
  )

  const input = (
    <input 
      value={search} 
      type="text" 
      placeholder="Search by title or author" 
      onChange={(e) => setSearch(e.target.value)} 
      onKeyUp={handleKeyUp}
    />
  )

  return (
    <section className="view root">
      <div className="root-search">
        {input}{button}
      </div>
      <div className="donation-link">
        If you like and want to support this project you can <Link href={"/about"}>learn more and donate here.</Link>
      </div>
    </section>
  )
}
