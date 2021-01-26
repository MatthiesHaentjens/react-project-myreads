import React from "react";
import "../App.css";
import * as BooksAPI from "../BooksAPI";
import SearchBooks from './SearchBooks';
import BooksShelfTable from './BookShelfTable';
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  handleChange = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then((res) => {
      updatedBook.shelf = shelf;
      this.setState((prevState) => ({
        books: prevState.books
          .filter((book) => book.id !== updatedBook.id)
          .concat(updatedBook),
      }));
    }).catch(error => console.log(error));
  };

  showSearchPage = (value) => {
    this.setState(() => ({
      showSearchPage: value,
    }));
  };

  render() {
    return (
        <div className="app">
          <Route
            path="/search"
            render={() =>
               (
                <SearchBooks
                  books={this.state.books}
                  handleChange={this.handleChange}
                />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => (
              <BooksShelfTable
                books={this.state.books}
                handleChange={this.handleChange}
              />
            )}
          />
        </div>
    );
  }
}

export default BooksApp;