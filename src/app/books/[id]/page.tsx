'use client';

import './style.css';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { kebabCase } from 'lodash';
import getBookInfo from './get-book-info';
import fixName from '../../../util/fix-name';

import books from '../../../store/books';

// interface Book {
//   Author: string,
//   Title: string,
//   'Secondary Author(s)': string,
//   'Illustrator(s)': string,
//   'Translator(s)': string,
//   bans: object[]
// }

interface BookInfo {
  description: {value: string},
  covers: string[]
}

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const book = books.find((b) => kebabCase(`${b.Title}-${b.Author}`) == params.id);
  const [bookInfo, setBookInfo] = useState<BookInfo>({
    description: {value: ''},
    covers: []
  });
  const [loading, setLoading] = useState(true);
  const banInfoCols = Object.keys(book?.bans[0] || {});

  function back(event: React.MouseEvent) {
    event.preventDefault();
    router.back();
  }

  useEffect(() => {
    getBookInfo({author: fixName(book?.Author || ''), title: book?.Title || ''}).then((res) => {
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
        {book?.Title}<br />
        <span className="author">by {fixName(book?.Author || '')}</span>
      </h2>
      {loading ? (<span className="loading-indicator"></span>) : (<p>{bookInfo?.description?.value || 'Description unavailable'}</p>)}
      <br />
      <h3>Ban Information</h3>
      <div className="table-container ban-info desktop">
        <table>
          <thead>
            <tr>
              {banInfoCols.map(name => (
                <th key={`col-${name}`}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {book?.bans.map((ban: object, index: number): any => (
              <tr key={`ban-row-${index}`}>
                {banInfoCols.map((col: string, i: number): any => (
                  <td key={`ban-row-${index}-col-${i}`}>{ban[col as keyof object]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ban-info mobile">
        <ul>
          {book?.bans.map((ban: object, index: number): any => (
            <li key={`ban-row-${index}`}>
              {banInfoCols.map((col: string, i: number): any => (
                <span key={`ban-row-${index}-col-${i}`}>
                  <strong>{col}:</strong>&nbsp;
                  {ban[col as keyof object]}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
