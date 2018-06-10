import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import styled from 'styled-components';
import Shelf from './Shelf';
import Search from './Search';
import img from '../icons/add.svg';

const ListBooks = styled.div`
  height: 100%;
  width: 100%;
`;

const ListBooksTitle = styled.div`
  padding: 10px 0;
  background: #2e7c31;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 400;
  margin: 0;
  color: white;
`;

const ListBooksContent = styled.div`
  padding: 0 0 80px;
  flex: 1;
`;

const OpenSearchContent = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
`;

const OpenSearchLink = styled(Link)`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #2e7d32;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 28px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  font-size: 0;
`;

class List extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}));
  }

  onUpdateBook = (book, shelf) => {
    book.shelf = shelf
    this.setState(prevState => ({
      books: prevState.books.filter((b) => b.id !== book.id).concat([book])
    }));

    BooksAPI.update(book, shelf);
  }

  render() {
    const {books} = this.state;

    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    const shelves = [
      {title: "Currently Reading", books: currentlyReading},
      {title: "Want to read", books: wantToRead},
      {title: "Read", books: read}
    ];

    return (
      <ListBooks>
        <ListBooksTitle>
          <Title>My Reads</Title>
        </ListBooksTitle>
        <ListBooksContent>
        {
          shelves.map(({title, books}, index) => (
            <Shelf
              key={index}
              title={title}
              books={books}
              updateBookShelf={this.onUpdateBook}
            />
          ))
        }
        </ListBooksContent>
        <OpenSearchContent>
          <OpenSearchLink
            to="/search"
          ></OpenSearchLink>
        </OpenSearchContent>
      </ListBooks>
    )
  }
}

export default List;