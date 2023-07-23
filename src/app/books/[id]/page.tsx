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
  const [loading, setLoading] = useState(true);

  function back(event) {
    event.preventDefault();
    router.back();
  }

  useEffect(() => {
    getBookInfo({
      title: book.Title,
      author: `${book.Author.split(', ')[1]} ${book.Author.split(', ')[0]}` // Turn "Name, Your" into "Your Name"
    }).then((res) => {
      setBookInfo(res);
      setLoading(false);
    });
  }, []);

  return (
    <section className="view detail">
      <a className="back" href="/books" onClick={back}>
        Back to search
      </a>
      {!loading && bookInfo?.covers?.length ? <img className="cover-image" src={`https://covers.openlibrary.org/b/id/${bookInfo.covers[0]}-M.jpg`} /> : null}
      <h2>
        {book.Title}<br />
        <span className="author">by {book.Author}</span>
      </h2>
      {loading ? (<span className="loading-indicator"></span>) : (<p>{bookInfo?.description?.value || 'Description unavailable'}</p>)}
    </section>
  )
}
