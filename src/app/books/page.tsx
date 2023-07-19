'use client';

import './style.css';

import { pick } from 'lodash';
import { useSearchParams } from 'next/navigation';
import levenshtein from 'js-levenshtein';

import data from '../data/list';

interface Book {
  Author: String,
  Title: String,
  'Secondary Author(s)': String,
  'Illustrator(s)': String,
  'Translator(s)': String,
  bans: Array
}

export default function Books() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const books: Book[] = [];
  const bookMeta = ['Author', 'Title', 'Secondary Author(s)', 'Illustrator(s)', 'Translator(s)'];
  const banInfo = ['State', 'District', 'Date of Challenge/Removal', 'Origin of Challenge'];

  data.forEach(item => {
    const existingEntry = books.find(b => b.Title == item.Title);
    if (existingEntry) {
      existingEntry.bans.push(pick(item, banInfo));
    } else {
      let book = pick(item, bookMeta);
      book.bans = [pick(book, banInfo)];
      books.push(book);
    }
  });

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
