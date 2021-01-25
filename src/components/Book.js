import React from "react";
import "../App.css";
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {
  render() {
    const { books, book, handleChange } = this.props;

    // Checks whether the book data is complete
    const smallThumbnail = book.imageLinks
      ? book.imageLinks.smallThumbnail
      : "https://books.google.co.th/googlebooks/images/no_cover_thumb.gif";
    const title = book.title ? book.title : "No known title";
    const authors = book.authors ? book.authors : "No known authors";

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${smallThumbnail})`,
            }}
          />
          <BookShelfChanger
            books={books}
            book={book}
            shelf={book.shelf}
            handleChange={handleChange}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book