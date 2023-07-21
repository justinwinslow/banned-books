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
  const banInfo = ['State', 'District', 'Date of Challenge/Removal', 'Origin of Challenge', 'Type of Ban'];

  data.forEach(item => {
    // See if there is an existing entry to this book
    // The current data source breaks out each instance of a ban
    const existingEntry = books.find((b) => (
      b.Title == item.Title && b.Author == item.Author
    ));

    if (existingEntry) {
      // If it exists, just add the ban info
      existingEntry.bans.push(pick(item, banInfo));
    } else {
      // Otherwise, let's create our new book instance
      let book = pick(item, bookMeta);
      book.bans = [pick(item, banInfo)];
      books.push(book);
    }
  });

  return books;
}
