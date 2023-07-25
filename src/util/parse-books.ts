import { pick } from 'lodash';

interface DataPoint {
  Author: string,
  Title: string,
  'Secondary Author(s)': string,
  'Illustrator(s)': string,
  'Translator(s)': string,
  State: string, 
  District: string, 
  'Date of Challenge/Removal': string, 
  'Origin of Challenge': string, 
  'Type of Ban': string
}

interface Book {
  Author: string,
  Title: string,
  'Secondary Author(s)': string,
  'Illustrator(s)': string,
  'Translator(s)': string,
  bans: object[]
}

export default function parseBooks(data: DataPoint[]) {
  const books: Book[] = [];
  const bookMeta = ['Author', 'Title', 'Secondary Author(s)', 'Illustrator(s)', 'Translator(s)'];
  const banInfo = ['State', 'District', 'Date of Challenge/Removal', 'Origin of Challenge', 'Type of Ban'];

  data.forEach((item: DataPoint) => {
    // See if there is an existing entry to this book
    // The current data source breaks out each instance of a ban
    const existingEntry = books.find((b: Book) => (
      b.Title == item.Title && b.Author == item.Author
    ));

    if (existingEntry) {
      // If it exists, just add the ban info
      existingEntry.bans.push(pick(item, banInfo));
    } else {
      // Otherwise, let's create our new book instance
      let book: Book = Object.assign({bans: []}, pick(item, bookMeta) as Book);
      book.bans.push(pick(item, banInfo));
      books.push(book);
    }
  });

  return books;
}
