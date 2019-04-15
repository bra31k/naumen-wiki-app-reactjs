import React, { Component } from 'react';
import { connect } from 'react-redux'

import Article from '../components/Article'


class ArticleList extends Component {

    render() {
        return (
            <div>
                { this.props.articles.isLoading
                    ? <p>Загружаю....</p>
                    : this.props.articles.error.length === 0 ? this.props.articles.articles.map((article, index) => {
                        return (
                            <Article
                                title={article.title}
                                snippet={article.snippet}
                                key={index}
                            />
                        )})
                        : <p>Произошла ошибка: {this.props.articles.error}</p>}
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
