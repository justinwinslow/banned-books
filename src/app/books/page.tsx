'use client';

import './style.css';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js'
import { kebabCase } from 'lodash';
import getScrollParent from '../../util/get-scroll-parent';
import books from '../../store/books';
import fixName from '../../util/fix-name';
import Search from '../../components/search';


export default function Books() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const rootElRef = useRef(null);

  useEffect(() => {
    if (!search) return setFilteredBooks(books.sort((a, b) => a.Title.localeCompare(b.Title)));
    
    const searcher = new Fuse(books.map(book => {
      return {
        author: fixName(book.Author),
        title: book.Title,
        book
      }
    }), {
      keys: ['title', 'author'],
      threshold: 0.3
    });
    setFilteredBooks(searcher.search(search).map(match => match.item.book));
  }, [search]);

  useEffect(() => {
    if (!filteredBooks.length || !sessionStorage.getItem('scrollPosition')) return;
    setScroll();
  }, [filteredBooks])

  function persistScroll() {
    const scrollParent = getScrollParent(rootElRef.current);
    if (scrollParent) sessionStorage.setItem('scrollPosition', scrollParent?.scrollTop || 0);
  }

  function setScroll() {
    const scrollPosition = parseInt((sessionStorage.getItem('scrollPosition') || ''), 10);
    const scrollParent = getScrollParent(rootElRef?.current);
    if (scrollPosition) {
      scrollParent?.scroll({
        top: scrollPosition,
      });
      sessionStorage.removeItem('scrollPosition');
    }
  }

  return (
    <section className="view books" ref={rootElRef}>
      <div className="search-wrapper">
        <Search route="books" />
      </div>
      <ul className="books">
        {!filteredBooks.length ? (<li className="no-results">No results found for: <strong>{search}</strong></li>) : (<></>)}
        {filteredBooks.map(b => (
          <li key={`${b.Title}-${b.Author}`}>
            <Link href={`/books/${encodeURIComponent(kebabCase(`${b.Title}-${b.Author}`))}`} onClick={persistScroll}>
              <header>
                {b.Title}
              </header>
              <section>
                <span className="author">by <strong>{fixName(b.Author)}</strong></span>
                <span className="bans">Known bans: {b.bans.length}</span>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
