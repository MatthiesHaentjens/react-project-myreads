import React from "react";
import "../App.css";
import BookShelfRow from './BookShelfRow';
import OpenSearch from './OpenSearch';
import PropTypes from 'prop-types';

class BooksShelfTable extends React.Component {

  static propTypes = {
      books: PropTypes.array,
      handleChange: PropTypes.func
  }

  render() {
    const shelves = [
      { name: "Currently Reading", value: "currentlyReading" },
      { name: "Want to Read", value: "wantToRead" },
      { name: "Read", value: "read" },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, index) => (
              <BookShelfRow
                key={index}
                shelf={shelf.name}
                shelfValue={shelf.value}
                books={this.props.books}
                handleChange={this.props.handleChange}
              />
            ))}
          </div>
        </div>
        <OpenSearch />
      </div>
    );
  }
}

export default BooksShelfTable