import React, { Component } from 'react';
import { connect } from 'react-redux'

import Artilce from '../components/Article'
import { getArticles } from '../actions/articlesActions'


class ArticleList extends Component {

    componentDidMount() {
        this.props.getArticles();
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <Article />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        articles: store.articles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getArticles: () => dispatch(getArticles()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList)
