export default async function getBookInfo({author, title}) {
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

  return bookInfo;  
}
