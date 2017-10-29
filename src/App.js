import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { HomeRoute, SearchRoute } from 'components/routes';
import { getAll } from 'utils/BookAPI';
import { setBooks } from 'modules/BookModule';

class App extends Component {
  
  state = {
    loading: true
  }
  
  componentWillMount(){
    getAll()
    .then((books) => {
      console.log('books', books)
      this.props.dispatch(setBooks(books));
      this.setState({loading: false});
    });
  }
  
  render() {
    if(this.state.loading){
      return (
        <div className="App">
          Loading
        </div>
      );
    }
    return (
      <div className="App">
        <Route exact path='/' component={HomeRoute} />
        <Route path='/search' render={SearchRoute} />
      </div>
    );
  }
}

export default App;
