import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

class BookShelfChanger extends React.Component {
  render() {

    const { books, book } = this.props

    // Callback function to find the index of the book in the books array
    const index = (element) => element.id === book.id

    let shelf = book.shelf 
      ? book.shelf 
      : books.findIndex(index) !== -1 ? books[books.findIndex(index)].shelf
      : "none" 

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

class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${
                this.props.book.imageLinks.smallThumbnail
              })`,
            }}
          />
          <BookShelfChanger
            books={this.props.books}
            book={this.props.book}
            shelf={this.props.book.shelf}
            handleChange={this.props.handleChange}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    );
  }
}

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
                      handleChange={this.props.handleChange} />
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

class BooksShelfTable extends React.Component {

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
        <OpenSearch showSearchPage={this.props.showSearchPage} />
      </div>
    );
  }
}

class OpenSearch extends React.Component {
  render() {
    return (
      <div className="open-search">
        <button onClick={() => this.props.showSearchPage(true)}>
          Add a book
        </button>
      </div>
    );
  }
}

class SearchBooks extends React.Component {
  state = {
    query: "",
    searchResults: [],
    error: "",
  };

  searchBooks = (query) => {
  
    try {
      this.setState(() => ({
        query: query,
      }));
      BooksAPI.search(query).then((data) => {
        this.setState({
          searchResults: data,
        });
      });
    } catch(error) {
        this.setState({
          error: "Sorry something went wrong, please try again",
        });
      };
  };

  render() {
    const { query, searchResults, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.showSearchPage(false)}
          >
            Close
          </button>
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
            {!error 
            ? searchResults.map((book) => (
              <li key={book.id}>
                <Book 
                  books={this.props.books}
                  book={book} 
                  handleChange={this.props.handleChange} />
              </li>
            ))
            :<h1>{error}</h1>
          }
          </ol>
        </div>
      </div>
    );
  }
}

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
  };

  // getBookData = (id) => {
  //   BooksAPI.get(id).then((data) => {
  //     console.log(data);
  //     return data;
  //   });
  // };

  handleChange = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then((res) => {
      updatedBook.shelf = shelf;
      console.log(updatedBook)
      console.log(this.state)
      this.setState((prevState) => ({
        books: prevState.books
          .filter((book) => book.id !== updatedBook.id)
          .concat(updatedBook),
      }));
      console.log(this.state)
    });
  };

  showSearchPage = (value) => {
    this.setState(() => ({
      showSearchPage: value,
    }));
  };

  // componentDidMount() {
  //   BooksAPI.getAll().then((books) => {
  //     this.setState(() => ({
  //       books,
  //     }));
  //   });
  // }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            showSearchPage={this.showSearchPage}
            books={this.state.books}
            handleChange={this.handleChange}
          />
        ) : (
          <BooksShelfTable
            books={this.state.books}
            handleChange={this.handleChange}
            showSearchPage={this.showSearchPage}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
