import React from 'react';


import ArticleList from '../containers/ArticleList'
import SearchBar from '../containers/SearchBar'

const App = () => {
    return (
      <div className="App">
          <SearchBar/>
          <ArticleList/>
      </div>
    );
}

export default App;
