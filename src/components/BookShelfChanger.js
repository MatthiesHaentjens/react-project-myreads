import React from "react";
import "../App.css";
import PropTypes from 'prop-types';

class BookShelfChanger extends React.Component {
  
  static propTypes = {
    books: PropTypes.array,
    book: PropTypes.object
  }

  render() {
    const { books, book } = this.props;

    // Callback function to find the index of the book in the books array
    const index = (element) => element.id === book.id;

    let shelf = book.shelf
      ? book.shelf
      : books.findIndex(index) !== -1
      ? books[books.findIndex(index)].shelf
      : "none";

    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) =>
            this.props.handleChange(book, event.target.value)
          }
          value={shelf}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger