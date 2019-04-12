import React, { Component } from 'react';
import { connect } from 'react-redux'

import Article from '../components/Article'


class ArticleList extends Component {

    componentDidMount() {
        console.log(this.props.articles)
    }

    render() {
        return (
            <div className="App">
                { this.props.articles.map(article => {
                    return (
                        <Article title={article.title}
                                 snippet={article.snippet}
                                 key={article.pageid}
                        />
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        articles: store.articles,
    }
}

export default connect(
    mapStateToProps
)(ArticleList)
