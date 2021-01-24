import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

const books = [
  {
    id: 1,
    title: "The Adventures of Tom Sawyer",
    authors: "Mark Twain",
    thumbnail:
      "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
    shelf: "currentlyReading",
  },
  {
    id: 2,
    title: "1776",
    authors: "David McCullough",
    thumbnail:
      "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
    shelf: "currentlyReading",
  },
  {
    id: 3,
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    thumbnail:
      "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
    shelf: "currentlyReading",
  },
  {
    id: 4,
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    thumbnail:
      "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
    shelf: "wantToRead",
  },
  {
    id: 5,
    title: "Oh, the Places You'll Go!",
    authors: "Seuss",
    thumbnail:
      "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
    shelf: "read",
  },
];

const shelves = [
  { name: "Currently Reading", value: "currentlyReading" },
  { name: "Want to Read", value: "wantToRead" },
  { name: "Read", value: "read" },
];

class BookShelfChanger extends React.Component {

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) =>
            this.props.handleChange(this.props.book, event.target.value)
          }
          value={this.props.book.shelf}
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
            {this.props.books.map(book => {
                return book.shelf === this.props.shelfValue && (
                  <li key={book.id}>
                    <Book
                      book={book}
                      handleChange={this.props.handleChange}
                    />
                  </li>
                )
                })}
          </ol>
        </div>
      </div>
    );
  }
}

class BooksShelfTable extends React.Component {
  render() {
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
  render() {
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
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchBooks("fitness").map((book) => (
              <li key={book.id}>
                <Book book={book} handleChange={this.props.handleChange} />
              </li>
            ))}
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

  searchBooks = (query) => {
    BooksAPI.search(query).then((data) => {
      // console.log(data);
      return data;
    });
  };

  handleChange = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(res => {
      updatedBook.shelf = shelf
      this.setState((prevState) => ({
        books: prevState.books.filter(book => book.id !== updatedBook.id).concat(updatedBook),
      }));
    });
  };

  showSearchPage = (value) => {
    this.setState(() => ({
      showSearchPage: value,
    }));
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            showSearchPage={this.showSearchPage}
            books={this.state.books}
            handleChange={this.handleChange}
            searchBooks={this.searchBooks}
          />
        ) : (
          <BooksShelfTable
            shelves={shelves}
            books={this.state.books}
            handleChange={this.handleChange}
            showSearchPage={this.showSearchPage}
            // getBookData={this.getBookData}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
