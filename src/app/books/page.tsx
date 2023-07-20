'use client';

import './style.css';

import { useSearchParams } from 'next/navigation';
import levenshtein from 'js-levenshtein';

import parseBooks from '../../util/parse-books';
import data from '../data/list';


export default function Books() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const books = parseBooks(data);

  function filteredBooks (books) {
    return books.filter(b => {
      return b.Title.toLowerCase().includes((search || '').toLowerCase()); // || levenshtein(b.Title, search) <= 2;
    });
    // .sort((a, b) => {
    //   console.log(levenshtein(a.Title, search), levenshtein(b.Title, search));
    //   return levenshtein(b.Title, search) - levenshtein(a.Title, search);
    // });
  }

  return (
    <section className="view books">
      <ul className="books">
        {filteredBooks(books).map(b => (
          <li key={b.Title}>
            {b.Title}
          </li>
        ))}
      </ul>
    </section>
  )
}
