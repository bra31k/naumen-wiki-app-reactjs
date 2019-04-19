import React from 'react';
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import Article from '../components/Article'


export const ArticleList = ({store}) => {
        return (
            <div>
                {store.isLoading && store.articles.length < 10
                    ? <p>Загружаю....</p>
                    : store.error === null ? store.articles.map((article, index) => {
                            return (
                                <Article
                                    title={article.title}
                                    snippet={article.snippet}
                                    key={index}
                                />
                            )})
                        : <p>Произошла ошибка: {store.error}</p>}
            </div>
        );
}

ArticleList.propTypes = {
    store: PropTypes.shape({
        isLoading: PropTypes.bool,
        error: PropTypes.string,
        articles: PropTypes.array,
        title: PropTypes.string,
        snippet: PropTypes.string,
    }).isRequired
};

const mapStateToProps = store => {
    return {
        store: store,
    }
}

export default connect(
    mapStateToProps
)(ArticleList)
