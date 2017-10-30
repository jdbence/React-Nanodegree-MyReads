import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBookStatus } from 'modules/BookModule';
import {Header, HeaderContent, HeaderTitle} from 'components/ui/header';
import {ScrollPane} from 'components/ui/scrollPane';
import { Tabs, Tab } from 'components/ui/tabs';
import {Category, READ, READING, FAVORITE} from 'components/ui/category';
import addIcon from 'static/icon/add.svg';
import searchIcon from 'static/icon/search.svg';
import { withRouter } from 'react-router-dom';
import { camelCase } from 'utils/StringUtil';

const AddButton = (props) => {
  return (
    <button className="fab" onClick={props.onClick}>
      <img src={addIcon} alt="add" />
    </button>
  );
};

const Search2Button = (props) => {
  return (
    <button className="toolbar-button" onClick={props.onClick}>
      <img src={searchIcon} alt="search" />
    </button>
  );
};

const SearchButton = (props) => {
  return (
    <button className="button-icon" onClick={props.onClick}>
      <img src={searchIcon} alt="search" />
    </button>
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
    const shelf = camelCase(category);
    return books.filter(d => d.shelf === shelf);
  }
  
  onTabChange = (selectedTab) => {
    this.setState({...this.state, selectedTab});
  }
  
  onClickCategory = (id, shelf) => {
    this.props.setBookStatus({id, shelf});
  }
  
  render(){
    const categories = [READING, FAVORITE, READ];
    const { books, history } = this.props;
    const { selectedTab } = this.state;
    
    return (
      <div className="page">
        <Header column>
          <HeaderContent>
            <HeaderTitle>MY Reads</HeaderTitle>
            <SearchButton onClick={() => history.push('/search')}/>
          </HeaderContent>
          <HeaderContent>
            <Tabs value={selectedTab} onChange={this.onTabChange}>
              {categories.map((d, i) => <Tab key={`tab${i}`}>{d}</Tab>)}
            </Tabs>
          </HeaderContent>
        </Header>
        <ScrollPane>
          <Category books={this.filterBooks(books, categories[selectedTab])} onClickCategory={this.onClickCategory}/>
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
  books: state.books.books
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeRoute));