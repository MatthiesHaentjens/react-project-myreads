import React from "react";
import "./App.css";

class OpenSearch extends React.Component {
  render() {
    return (
      <div className="open-search">
        <button onClick={() => this.setState({ showSearchPage: true })}>
          Add a book
        </button>
      </div>
    );
  }
}

class BookShelfChanger extends React.Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.props.currentShelf}
          onChange={this.props.handleChange}
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
              backgroundImage: `url(${this.props.thumbnail})`,
            }}
          />
          <BookShelfChanger
            key={this.props.index}
            handleChange={this.props.handleChange}
            currentShelf={this.props.currentShelf}
          />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
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
            {this.props.books.map(
              (book, index) =>
                this.props.currentShelf === this.props.shelfValue && (
                  <li key={index}>
                    <Book
                      title={book.title}
                      authors={book.authors}
                      thumbnail={book.thumbnail}
                      handleChange={this.props.handleChange}
                      currentShelf={this.props.currentShelf}
                      index={index}
                    />
                  </li>
                )
            )}
          </ol>
        </div>
      </div>
    );
  }
}

class BooksShelfTable extends React.Component {
  render() {
    console.log('Props', this.props)
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
                currentShelf={this.props.currentShelf}
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

class SearchBooks extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentShelf: 'currentlyReading' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ currentShelf: event.target.value });
  }

  // state = {
  //   /**
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   showSearchPage: false,
  // };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <BooksShelfTable
            shelves={shelves}
            books={books}
            currentShelf={this.state.currentShelf}
            handleChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

const books = [
  {
    id: 1,
    title: "The Adventures of Tom Sawyer",
    authors: "Mark Twain",
    thumbnail:
      "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
  },
  {
    id: 2,
    title: "1776",
    authors: "David McCullough",
    thumbnail:
      "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
  },
  {
    id: 3,
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    thumbnail:
      "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
  },
  {
    id: 4,
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    thumbnail:
      "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
  },
  {
    id: 5,
    title: "Oh, the Places You'll Go!",
    authors: "Seuss",
    thumbnail:
      "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",

  },
];

const shelves = [
  { name: "Currently Reading", value: "currentlyReading" },
  { name: "Want to Read", value: "wantToRead" },
  { name: "Read", value: "read" },
];

export default BooksApp;
