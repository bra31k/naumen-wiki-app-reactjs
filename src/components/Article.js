import React, { Component } from 'react';

class Article extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p dangerouslySetInnerHTML={{__html: this.props.snippet}}/>
            </div>
        );
    }
}

export default Article;
