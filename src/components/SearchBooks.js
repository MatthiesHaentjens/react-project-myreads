import React from "react";
import PropTypes from "prop-types";
import { Book } from "./Book";
import { arrayContent } from "../helpers"

class SearchBooks extends React.Component {

    static propTypes = {
        books: PropTypes.array
    }

    render() {

        return (
        <div className="search-books">
            <div className="search-books-bar">
            {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li key={book.id}>
                            <Book 
                                title={book.title}
                                authors={arrayContent(book.authors)}
                                thumbnail={book.imageLinks.smallThumbnail}
                            />
                        </li>)
                    )}
            </ol>
            </div>
        </div>
        );
    }
}

export { SearchBooks };
