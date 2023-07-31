function simplifyBookInfo(bookInfo: any) {
  if (typeof bookInfo.description == 'object') {
    // Descriptions come back in a couple different formats
    // Maybe a matter of an older data model
    bookInfo.description = bookInfo.description?.value || '';
  }
  if (bookInfo.covers?.length) {
    // I noticed sometimes there will be erroneous values in the
    // data set, so let's filter anything that doesn't make sense
    bookInfo.covers = bookInfo.covers.filter((c: number) => c > 0);
  }
  return bookInfo;
}

export default async function getBookInfo({author, title} : {author: string, title: string}) {
  const root = 'https://openlibrary.org/search.json';
  const url = `${root}?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
  // Let's search for the book based on title and author
  const searchResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',  
    },
    mode: 'cors'
  });
  // Unwrap our search result
  const searchResult = await searchResponse.json();
  
  // Find the path to the book information
  const id = searchResult?.docs?.[0]?.key;

  // If we didn't find one, let's return 
  if (!id) return undefined;
    
  // If we did, let's query the book information
  const bookResponse = await fetch(`https://openlibrary.org${id}.json`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',  
    },
    mode: 'cors'
  });
  // Unrwrap the response
  const bookInfo = await bookResponse.json();

  return simplifyBookInfo(bookInfo);
}
