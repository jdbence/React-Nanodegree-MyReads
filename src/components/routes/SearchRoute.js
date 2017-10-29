import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBookStatus } from 'modules/BookModule';
import {Header, HeaderContent} from 'components/ui/header';
import {ScrollPane} from 'components/ui/scrollPane';
import backIcon from 'static/icon/arrow-back.svg';
import { withRouter } from 'react-router-dom';
import { search } from 'utils/BookAPI';

const READ = 'Read';
const READING = 'Currently Reading';
const FAVORITE = 'Want to Read';

const Book = (data) => {
  return (
    <article className="book" key={data.id}>
      <div className="book-img" style={{backgroundImage: `url(${data.imageLinks && data.imageLinks.thumbnail})`}}/>
      <div className="book-info">
        <h4>{data.title}</h4>
        <p>{data.authors && data.authors[0]}</p>
      </div>
    </article>
  );
};

const BackButton = (props) => {
  return (
    <button className="button-icon" onClick={props.onClick}>
      <img src={backIcon} alt="backIcon" />
    </button>
  );
};

const Category = ({title='category', books}) => {
  return (
    <section key={title} className="book-container">
      {books.map((d) => Book(d))}
      {books.length === 0 && <div>No Book</div>}
    </section>
  );
};

class SearchRoute extends Component {
  
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  state = {
    books: [], 
    search: ''
  }
  
  componentDidMount(){
    this.bookSearch(this.state.search);
  }
  
  bookSearch = (value) => {
    if(value && value !== ''){
      search(value)
      .then((books) => {
        if(!books.error){
          this.setState({books});
        }
      });
    } else {
      this.setState({books: []});
    }
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
  }
  
  render(){
    const categories = [READING, FAVORITE, READ];
    const { history } = this.props;
    const { books, search } = this.state;
    
    return (
      <div className="page">
        <Header headerInner="header-inner-search">
          <BackButton onClick={() => history.push('/')}/>
          <HeaderContent>
            <div className="input-search">
              <input type="text" value={search} onChange={this.onSearchChange}/>
            </div>
          </HeaderContent>
        </Header>
        <ScrollPane>
          <Category books={books}/>
        </ScrollPane>
        
      </div>
    );
  }
}

const mapDispatchToProps = {
  setBookStatus
};

const mapStateToProps = state => ({
  read: state.books.read,
  reading: state.books.reading,
  favorite: state.books.favorite
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchRoute));