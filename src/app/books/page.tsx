'use client';

import './style.css';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import levenshtein from 'js-levenshtein';
import { kebabCase } from 'lodash';
import parseBooks from '../../util/parse-books';
import books from '../../store/books';
import fixName from '../../util/fix-name';


export default function Books() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books.filter(b => {
      const safeSearch = (search || '').toLowerCase();
      const titleMatch = b.Title.toLowerCase().includes(safeSearch);
      const authorMatch = b.Author.toLowerCase().includes(safeSearch);
      // Split search and title into individual words without extra characters
      // check distance between each search word and all title words
      // math
      /* 
        TODO 
        [ ] Add loose matching 
      */
      return titleMatch || authorMatch; // || levenshtein(b.Title, search) <= 2;
    })
    .sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    }));
    /* 
      TODO 
      [ ] Sort based on proximity to search query 
    */
    // .sort((a, b) => {
    //   console.log(levenshtein(a.Title, search), levenshtein(b.Title, search));
    //   return levenshtein(b.Title, search) - levenshtein(a.Title, search);
    // });
  }, [search])


  /*
    TODO
    [ ] Save scroll position when navigating to detail views
  */

  return (
    <section className="view books">
      <ul className="books">
        {!filteredBooks.length ? (<li class="no-results">No results found for: <strong>{search}</strong></li>) : (<></>)}
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
