import React, { Component } from 'react';
import { connect } from 'react-redux'

import Article from '../components/Article'


class ArticleList extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                { this.props.articles.isLoading ? <p>Загружаю....</p>: this.props.articles.articles.map(article => {
                    return (
                        <Article
                            title={article.title}
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
        articles: store,
    }
}

export default connect(
    mapStateToProps
)(ArticleList)
