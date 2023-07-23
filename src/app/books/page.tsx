'use client';

import './style.css';

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

  function filteredBooks (books) {
    return books.filter(b => {
      /* TODO - Add loose matching */
      return b.Title.toLowerCase().includes((search || '').toLowerCase()); // || levenshtein(b.Title, search) <= 2;
    })
    .sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
    /* TODO - Sort based on proximity to search query */
    // .sort((a, b) => {
    //   console.log(levenshtein(a.Title, search), levenshtein(b.Title, search));
    //   return levenshtein(b.Title, search) - levenshtein(a.Title, search);
    // });
  }

  /*
    TODO - Save scroll position when navigating to detail views
  */

  return (
    <section className="view books">
      <ul className="books">
        {filteredBooks(books).map(b => (
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
