import React from 'react';
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import Article from '../components/Article'


const ArticleList = ({articles}) => {
        return (
            <div>
                {articles.isLoading
                    ? <p>Загружаю....</p>
                    : articles.error.length === 0 ? articles.articles.map((article, index) => {
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
    snipped: PropTypes.string,
};

const mapStateToProps = store => {
    return {
        articles: store,
    }
}

export default connect(
    mapStateToProps
)(ArticleList)
