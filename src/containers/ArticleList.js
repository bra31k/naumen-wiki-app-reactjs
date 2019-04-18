import React from 'react';
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import Article from '../components/Article'


export const ArticleList = ({articles}) => {
        return (
            <div>
                {articles.isLoading && articles.articles.length <= 10
                    ? <p>Загружаю....</p>
                    : articles.error === null ? articles.articles.map((article, index) => {
                            return (
                                <Article
                                    title={article.title}
                                    snippet={article.snippet}
                                    key={index}
                                />
                            )})
                        : <p>Произошла ошибка: {articles.error}</p>}
            </div>
        );
}

ArticleList.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    articles: PropTypes.object,
    title: PropTypes.string,
    snippet: PropTypes.string,
};

const mapStateToProps = store => {
    return {
        articles: store,
    }
}

export default connect(
    mapStateToProps
)(ArticleList)
