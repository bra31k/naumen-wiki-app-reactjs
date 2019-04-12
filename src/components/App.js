import React, { Component } from 'react';


import ArticleList from '../containers/ArticleList'
import SearchBar from '../containers/SearchBar'

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
