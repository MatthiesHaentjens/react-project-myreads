import React from "react";
import "../App.css";
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelfRow extends React.Component {

  static propTypes = {
    books: PropTypes.array,
    shelf: PropTypes.string,
    shelfValue: PropTypes.string,
    handleChange: PropTypes.func
  }

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