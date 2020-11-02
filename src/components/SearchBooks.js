import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";
import { Book } from "./Book";

class SearchBooks extends React.Component {
//   state = {
//       books: {}
//   }

//   componentDidMount() {
//       BooksAPI.getAll().then((books) => {
//           this.setState(() => ({
//               books,
//           }));
//           console.log(books)
//       });
//   }

//   getAllBooks() {
//     BooksAPI.getAll().then((books) => {
//       return(books);
//     });
//   }

  render() {

    // const { books } = this.props;
    // console.log(books)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
          <div className="search-books-input-wrapper">
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
                {/* {console.log(this.state.books)} */}
                {this.props.books.map((book) => (
                    <li key={book.id}>{book.title}</li>)
                )}
          </ol>
        </div>
      </div>
    );
  }
}

export { SearchBooks };
