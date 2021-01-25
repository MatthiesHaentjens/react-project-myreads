// import React from "react";
// import "./App.css";
// import * as BooksAPI from "./BooksAPI";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// class BookShelfChanger extends React.Component {
//   render() {
//     const { books, book } = this.props;

//     // Callback function to find the index of the book in the books array
//     const index = (element) => element.id === book.id;

//     let shelf = book.shelf
//       ? book.shelf
//       : books.findIndex(index) !== -1
//       ? books[books.findIndex(index)].shelf
//       : "none";

//     return (
//       <div className="book-shelf-changer">
//         <select
//           onChange={(event) =>
//             this.props.handleChange(book, event.target.value)
//           }
//           value={shelf}
//         >
//           <option value="move" disabled>
//             Move to...
//           </option>
//           <option value="currentlyReading">Currently Reading</option>
//           <option value="wantToRead">Want to Read</option>
//           <option value="read">Read</option>
//           <option value="none">None</option>
//         </select>
//       </div>
//     );
//   }
// }

// class Book extends React.Component {
//   render() {
//     const { books, book, handleChange } = this.props;

//     // Checks whether the book data is complete
//     const smallThumbnail = book.imageLinks
//       ? book.imageLinks.smallThumbnail
//       : "https://books.google.co.th/googlebooks/images/no_cover_thumb.gif";
//     const title = book.title ? book.title : "No known title";
//     const authors = book.authors ? book.authors : "No known authors";

//     return (
//       <div className="book">
//         <div className="book-top">
//           <div
//             className="book-cover"
//             style={{
//               width: 128,
//               height: 188,
//               backgroundImage: `url(${smallThumbnail})`,
//             }}
//           />
//           <BookShelfChanger
//             books={books}
//             book={book}
//             shelf={book.shelf}
//             handleChange={handleChange}
//           />
//         </div>
//         <div className="book-title">{title}</div>
//         <div className="book-authors">{authors}</div>
//       </div>
//     );
//   }
// }

// class BookShelfRow extends React.Component {
//   render() {
//     return (
//       <div className="bookshelf">
//         <h2 className="bookshelf-title">{this.props.shelf}</h2>
//         <div className="bookshelf-books">
//           <ol className="books-grid">
//             {this.props.books.map((book) => {
//               return (
//                 book.shelf === this.props.shelfValue && (
//                   <li key={book.id}>
//                     <Book
//                       books={this.props.books}
//                       book={book}
//                       handleChange={this.props.handleChange}
//                     />
//                   </li>
//                 )
//               );
//             })}
//           </ol>
//         </div>
//       </div>
//     );
//   }
// }

// class BooksShelfTable extends React.Component {
//   render() {
//     const shelves = [
//       { name: "Currently Reading", value: "currentlyReading" },
//       { name: "Want to Read", value: "wantToRead" },
//       { name: "Read", value: "read" },
//     ];

//     return (
//       <div className="list-books">
//         <div className="list-books-title">
//           <h1>MyReads</h1>
//         </div>
//         <div className="list-books-content">
//           <div>
//             {shelves.map((shelf, index) => (
//               <BookShelfRow
//                 key={index}
//                 shelf={shelf.name}
//                 shelfValue={shelf.value}
//                 books={this.props.books}
//                 handleChange={this.props.handleChange}
//               />
//             ))}
//           </div>
//         </div>
//         <OpenSearch showSearchPage={this.props.showSearchPage} />
//       </div>
//     );
//   }
// }

// class OpenSearch extends React.Component {
//   render() {
//     return (
//       <div className="open-search">
//         <Link 
//           to="/search"
//         >
//           <button>
//             Add a book
//           </button>
//         </Link>
//       </div>
//     );
//   }
// }

// class SearchBooks extends React.Component {
//   state = {
//     query: "",
//     searchResults: [],
//     error: "",
//   };

//   searchBooks = (query) => {
//     this.setState(() => ({
//       query: query,
//     }));

//     // Call the search API and update state with an error message is nothing found
//     BooksAPI.search(query.trim())
//       .then((data) => {
//         data.length > 0
//           ? this.setState({ searchResults: data, error: "" })
//           : this.setState({
//               error: "Sorry we could not find what your were looking for",
//             });
//         // Update state with an error message is the API returns an error
//       })
//       .catch((error) => {
//         this.setState({
//           error: "Sorry something went wrong, please try again",
//         });
//       });
//   };

//   render() {
//     const { query, searchResults, error } = this.state;

//     return (
//       <div className="search-books">
//         <div className="search-books-bar">
//           <Link 
//             to="/"
//             className="close-search"
//           >
//             Close
//           </Link>
//           <div className="search-books-input-wrapper">
//             <input
//               type="text"
//               placeholder="Search by title or author"
//               value={query}
//               onChange={(event) => this.searchBooks(event.target.value)}
//             />
//           </div>
//         </div>
//         <div className="search-books-results">
//           <ol className="books-grid">
//             {!error ? (
//               searchResults.map((book) => (
//                 <li key={book.id}>
//                   <Book
//                     books={this.props.books}
//                     book={book}
//                     handleChange={this.props.handleChange}
//                   />
//                 </li>
//               ))
//             ) : (
//               <h1>{error}</h1>
//             )}
//           </ol>
//         </div>
//       </div>
//     );
//   }
// }

// class BooksApp extends React.Component {
//   state = {
//     books: [],
//   };

//   handleChange = (updatedBook, shelf) => {
//     BooksAPI.update(updatedBook, shelf).then((res) => {
//       updatedBook.shelf = shelf;
//       this.setState((prevState) => ({
//         books: prevState.books
//           .filter((book) => book.id !== updatedBook.id)
//           .concat(updatedBook),
//       }));
//     }).catch(error => console.log(error));
//   };

//   showSearchPage = (value) => {
//     this.setState(() => ({
//       showSearchPage: value,
//     }));
//   };

//   render() {
//     return (
//       <Router>
//         <div className="app">
//           <Route
//             path="/search"
//             render={() =>
//                (
//                 <SearchBooks
//                   books={this.state.books}
//                   handleChange={this.handleChange}
//                 />
//               )
//             }
//           />
//           <Route
//             exact
//             path="/"
//             render={() => (
//               <BooksShelfTable
//                 books={this.state.books}
//                 handleChange={this.handleChange}
//               />
//             )}
//           />
//         </div>
//       </Router>
//     );
//   }
// }

// export default BooksApp;
