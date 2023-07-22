'use client';

import './style.css';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { kebabCase } from 'lodash';
import getBookInfo from './get-book-info';

import books from '../../../store/books';

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const book = books.find((b) => kebabCase(`${b.Title}-${b.Author}`) == params.id);
  const [bookInfo, setBookInfo] = useState({});

  function back(event) {
    event.preventDefault();
    router.back();
  }

  useEffect(() => {
    getBookInfo({
      title: book.Title,
      author: `${book.Author.split(', ')[1]} ${book.Author.split(', ')[0]}`
    }).then((res) => {
      setBookInfo(res);
    });
  }, []);

  return (
    <section className="view detail">
      <h2>
        <a className="back" href="/books" onClick={back}>
          Back to search
        </a><br />
        {book.Title}<br />
        <span className="author">by {book.Author}</span>
      </h2>
      <p>{bookInfo?.description?.value}</p>
    </section>
  )
}
