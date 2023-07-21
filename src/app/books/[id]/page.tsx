'use client';

import './style.css';

import { useParams, useRouter } from 'next/navigation';
import { kebabCase } from 'lodash';

import books from '../../../store/books';

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const book = books.find((b) => kebabCase(`${b.Title}-${b.Author}`) == params.id);

  console.log(book);

  function back(event) {
    event.preventDefault();
    router.back();
  }

  return (
    <section className="view detail">
      <h2>
        <a className="back" href="/books" onClick={back}>
          Back to search
        </a><br />
        {book.Title}<br />
        <span className="author">by {book.Author}</span>
      </h2>
    </section>
  )
}
