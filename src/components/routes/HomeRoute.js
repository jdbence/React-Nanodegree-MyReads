import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBookStatus } from 'modules/BookModule';
import {Header, HeaderContent, HeaderTitle} from 'components/ui/header';
import {ScrollPane} from 'components/ui/scrollPane';
import { Tabs, Tab } from 'components/ui/tabs';
import addIcon from 'static/icon/add.svg';
import { withRouter } from 'react-router-dom';

const READ = 'Read';
const READING = 'Currently Reading';
const FAVORITE = 'Want to Read';

const Book = (data) => {
  return (
    <article className="book" key={data.id}>
      <div className="book-img" style={{backgroundImage: `url(${data.imageLinks.thumbnail})`}}/>
      <div className="book-info">
        <h4>{data.title}</h4>
        <p>{data.authors[0]}</p>
      </div>
    </article>
  );
};

const AddButton = (props) => {
  return (
    <button className="fab" onClick={props.onClick}>
      <img src={addIcon} alt="addIcon" />
    </button>
  );
};

const Category = ({title, books}) => {
  return (
    <section key={title} className="book-container">
      {books.map((d) => Book(d))}
      {books.length === 0 && <div>No Book</div>}
    </section>
  );
};

class HomeRoute extends Component {
  
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  state = {
    selectedTab: 1
  }
  
  filterBooks = (books, category) => {
    const {read, reading, favorite} = this.props;
    return books;
    if(category === READ){
      return books.filter(d => read.indexOf(d.id) !== -1);
    }else if(category === READING){
      return books.filter(d => reading.indexOf(d.id) !== -1);
    }
    return books.filter(d => favorite.indexOf(d.id) !== -1);
  }
  
  onTabChange = (selectedTab) => {
    this.setState({...this.state, selectedTab});
  }
  
  render(){
    const categories = [READING, FAVORITE, READ];
    const { books, history } = this.props;
    const { selectedTab } = this.state;
    
    return (
      <div className="page">
        <Header column>
          <HeaderContent>
            <HeaderTitle>My Reads</HeaderTitle>
          </HeaderContent>
          <HeaderContent>
            <Tabs value={selectedTab} onChange={this.onTabChange}>
              {categories.map((d, i) => <Tab key={`tab${i}`}>{d}</Tab>)}
            </Tabs>
          </HeaderContent>
        </Header>
        <ScrollPane>
          <Category title={selectedTab} books={this.filterBooks(books, categories[selectedTab])}/>
        </ScrollPane>
        <AddButton onClick={() => history.push('/search')}/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setBookStatus
};

const mapStateToProps = state => ({
  books: state.books.books,
  read: state.books.read,
  reading: state.books.reading,
  favorite: state.books.favorite
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeRoute));