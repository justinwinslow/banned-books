'use client';

import './style.css';

import { useParams } from 'next/navigation';
import { kebabCase } from 'lodash';

import books from '../../../store/books';

export default function Detail() {
  const params = useParams();
  const book = books.find((b) => kebabCase(b.Title) == params.id);

  return (
    <section className="view detail">
      {book.Title}<br />
      {book.Author}<br />
    </section>
  )
}
