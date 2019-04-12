import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect"

import { getArticles } from '../actions/articlesActions'
import '../style/SearchBar.css'


class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {inputValue: ""}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.getArticles(this.state.inputValue)
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                        placeholder="Искать здесь..."
                    />
                        <button type="submit"/>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getArticles: inputValue => dispatch(getArticles(inputValue)),
    }
}

export default connect(null,
    mapDispatchToProps
)(SearchBar)