'use client';

import './style.css';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js'
import { kebabCase } from 'lodash';
import parseBooks from '../../util/parse-books';
import books from '../../store/books';
import fixName from '../../util/fix-name';


export default function Books() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
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
  }, [search])


  /*
    TODO
    [ ] Save scroll position when navigating to detail views
  */

  return (
    <section className="view books">
      <ul className="books">
        {!filteredBooks.length ? (<li className="no-results">No results found for: <strong>{search}</strong></li>) : (<></>)}
        {filteredBooks.map(b => (
          <li key={`${b.Title}-${b.Author}`}>
            <Link href={`/books/${encodeURIComponent(kebabCase(`${b.Title}-${b.Author}`))}`}>
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
