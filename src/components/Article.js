import React from 'react';
import PropTypes from "prop-types"

const href = 'https://en.wikipedia.org/wiki/'

const Article = ({title, snippet}) =>  {
        return (
            <div>
                <h2><a href={href + title} target="_blank" rel="noopener noreferrer">{title}</a></h2>
                <p dangerouslySetInnerHTML={{__html: snippet}}/>
            </div>
        );
}


Article.propTypes = {
    title: PropTypes.string,
    snippet: PropTypes.string,
};

export default Article;
