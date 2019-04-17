import React from 'react';
import PropTypes from "prop-types"
import "../style/index.css"

const href = 'https://en.wikipedia.org/wiki/'

const Article = ({title, snippet}) =>  {
        return (
            <div className="article">
                <h3><a href={href + title} target="_blank" rel="noopener noreferrer">{title}</a></h3>
                <p dangerouslySetInnerHTML={{__html: snippet}}/>
            </div>
        );
}


Article.propTypes = {
    title: PropTypes.string,
    snippet: PropTypes.string,
};

export default Article;
