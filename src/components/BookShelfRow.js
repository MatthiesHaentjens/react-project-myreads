import React from "react";
import "../App.css";
import Book from './Book';

class BookShelfRow extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => {
              return (
                book.shelf === this.props.shelfValue && (
                  <li key={book.id}>
                    <Book
                      books={this.props.books}
                      book={book}
                      handleChange={this.props.handleChange}
                    />
                  </li>
                )
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelfRow