import React from "react";
import "../App.css";
import * as BooksAPI from "../BooksAPI";
import Book from './Book';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class SearchBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array,
    handleChange: PropTypes.func
  }

  state = {
    query: "",
    searchResults: [],
    error: "",
  };

  searchBooks = (query) => {
    this.setState(() => ({
      query: query,
    }));

    // Call the search API and update state with an error message is nothing found
    BooksAPI.search(query.trim())
      .then((data) => {
        data.length > 0
          ? this.setState({ searchResults: data, error: "" })
          : this.setState({
              error: "Sorry we could not find what your were looking for",
            });
        // Update state with an error message is the API returns an error
      })
      .catch((error) => {
        this.setState({
          error: "Sorry something went wrong, please try again",
        });
      });
  };

  render() {
    const { query, searchResults, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!error ? (
              searchResults.map((book) => (
                <li key={book.id}>
                  <Book
                    books={this.props.books}
                    book={book}
                    handleChange={this.props.handleChange}
                  />
                </li>
              ))
            ) : (
              <h1>{error}</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks