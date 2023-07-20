import { pick } from 'lodash';

interface Book {
  Author: String,
  Title: String,
  'Secondary Author(s)': String,
  'Illustrator(s)': String,
  'Translator(s)': String,
  bans: Array
}

export default function parseBooks(data) {
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

  return books;
}
