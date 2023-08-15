'use client';

import './style.css';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { kebabCase } from 'lodash';
import CollapsibleText from '../../../components/collapsible-text';
import getBookInfo from './get-book-info';
import fixName from '../../../util/fix-name';

import books from '../../../store/books';

type Ban = {
  'State District': string,
  'Date of Challenge/Removal': string,
  'Origin of Challenge': string,
  'Type of Ban': string
}


export function generateStaticParams() {
  return books.map((book) => ({
    id: kebabCase(`${book.Title}-${book.Author}`),
  }))
}

interface BookInfo {
  description: string,
  covers: string[]
}

export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const book = books.find((b) => kebabCase(`${b.Title}-${b.Author}`) == params.id);
  const [bookInfo, setBookInfo] = useState<BookInfo>({
    description: '',
    covers: []
  });
  const [loading, setLoading] = useState(true);
  const banInfoCols = Object.keys(book?.bans[0] || {});

  function back(event: React.MouseEvent) {
    event.preventDefault();
    if (window?.history?.length) {
      // If we have history entries let's just go back
      router.back();  
    } else {
      // Otherwise, the user likely navigated direct so let's
      // send them to the books search
      router.push('/books');
    }
  }

  useEffect(() => {
    getBookInfo({author: fixName(book?.Author || ''), title: book?.Title || ''})
      .then((res) => {
        setBookInfo(res);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  function sortBans(bans: any[]) {
    return bans.sort((a:Ban, b:Ban): number => Date.parse(a?.['Date of Challenge/Removal']) - Date.parse(b?.['Date of Challenge/Removal']));
  }

  return (
    <section className="view detail">
      <a className="back" href="/books" onClick={back}>
        Back to search
      </a>
      {!loading && bookInfo?.covers?.length ? <img className="cover-image" src={`https://covers.openlibrary.org/b/id/${bookInfo.covers[0]}-M.jpg`} /> : null}
      <h2>
        {book?.Title}<br />
        <span className="author">by <strong>{fixName(book?.Author || '')}</strong></span>
      </h2>
      {loading ? (<p><span className="loading-indicator"></span></p>) : (<CollapsibleText content={bookInfo?.description} defaultContent="Description unavailable"></CollapsibleText>)}
      <p>
        <a target="_blank" href={`https://www.amazon.com/gp/search?ie=UTF8&tag=bannedbook002-20&linkCode=ur2&linkId=ee83837352744107a9bc8d5e2e2864e4&camp=1789&creative=9325&index=books&keywords=${book?.Title} ${fixName(book?.Author || '')}`}>
          Buy on Amazon
        </a>
      </p>
      <br />
      <h3>Ban Information</h3>
      {/* For large screens we'll show a table */}
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
            {sortBans(book?.bans || []).map((ban: Ban, index: number): any => (
              <tr key={`ban-row-${index}`}>
                {banInfoCols.map((col: string, i: number): any => (
                  <td key={`ban-row-${index}-col-${i}`}>{ban[col as keyof object]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* For small screens we'll show a list */}
      <div className="ban-info mobile">
        <ul>
          {sortBans(book?.bans || []).map((ban: object, index: number): any => (
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
