import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBookStatus } from 'modules/BookModule';
import {Header, HeaderContent} from 'components/ui/header';
import {ScrollPane} from 'components/ui/scrollPane';
import {Category, READ, READING, FAVORITE} from 'components/ui/category';
import backIcon from 'static/icon/arrow-back.svg';
import { withRouter } from 'react-router-dom';
import { search } from 'utils/BookAPI';

const BackButton = (props) => {
  return (
    <button className="button-icon" onClick={props.onClick}>
      <img src={backIcon} alt="backIcon" />
    </button>
  );
};

class SearchRoute extends Component {
  
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  state = {
    searchBooks: [], 
    search: ''
  }
  
  componentDidMount(){
    this.bookSearch(this.state.search);
    this.textInput.focus();
  }
  
  setShelf = (searchBooks) => {
    const { books } = this.props;
    searchBooks.forEach((b) => {
      let stateBook = books.find(d => d.id == b.id);
      if(stateBook){
        b.shelf = stateBook.shelf;
      }
    });
    return searchBooks;
  }
  
  bookSearch = (value) => {
    if(value && value !== ''){
      search(value)
      .then((books) => {
        if(!books.error){
          this.setState({searchBooks: this.setShelf(books)});
        }
      });
    } else {
      this.setState({searchBooks: []});
    }
  }
  
  onClickCategory = (id, shelf) => {
    const { searchBooks } = this.state;
    let book = searchBooks.find(b => b.id === id);
    book.shelf = shelf;
    this.props.setBookStatus({id, shelf, book});
    this.setState({searchBooks: searchBooks.map(b => b.id === id ? book : b)});
  }
  
  searchTimout = 0;
  
  onSearchChange = (e) => {
    const search = e.target.value;
    const timeout = search === '' ? 0 : 1000;
    
    if(search === '' || search.match(/^[0-9a-zA-Z\s]+$/)){
      this.setState({
        search
      });
      clearTimeout(this.searchTimout);
      this.searchTimout = setTimeout(() => this.bookSearch(search), timeout);
    }
  }
  
  componentWillUnmount(){
    clearTimeout(this.searchTimout);
    this.textInput = null;
  }
  
  render(){
    const { history } = this.props;
    const { searchBooks, search } = this.state;
    
    return (
      <div className="page">
        <Header headerInner="header-inner-search">
          <BackButton onClick={() => history.push('/')}/>
          <HeaderContent>
            <div className="input-search">
              <input type="text" placeholder="Search by Title or Author"
                ref={(input) => { this.textInput = input; }}
                value={search} onChange={this.onSearchChange}/>
            </div>
          </HeaderContent>
        </Header>
        <ScrollPane>
          <Category books={searchBooks} onClickCategory={this.onClickCategory}/>
        </ScrollPane>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setBookStatus
};

const mapStateToProps = state => ({
  books: state.books.books
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchRoute));