import React, { Component } from 'react';


import ArticleList from '../containers/ArticleList'
import SearchBar from '../containers/SearchBar'
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <SearchBar/>
          <ArticleList/>
      </div>
    );
  }
}

export default App;
