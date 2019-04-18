import React from 'react';


import ArticleList from '../containers/ArticleList'
import SearchBar from '../containers/SearchBar'
import "../style/index.css"


export const App = () => {
    return (
      <div className="container">
          <div className="header">
            <SearchBar/>
          </div>
          <div className="content">
            <ArticleList/>
          </div>
      </div>
    );
}

export default App;
