import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect"

import { getArticles } from '../actions/articlesActions'
import '../style/SearchBar.css'


class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            sort: "relevance",
        }

        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeText(event) {
        this.setState({inputValue: event.target.value})
    }

    handleChangeSelect(event) {
        this.setState({sort: event.target.value})
        this.props.getArticles(this.state.inputValue, this.state.sort)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.getArticles(this.state.inputValue, this.state.sort)
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChangeText}
                        value={this.state.inputValue}
                        placeholder="Искать здесь..."
                    />
                        <button type="submit"/>
                </form>
                <select value={this.state.sort} onChange={this.handleChangeSelect}>
                    <option value="relevance">Relevance</option>
                    <option value="just_match">Just match</option>
                    <option value="none">None</option>
                    <option value="incoming_links_asc">incoming_links_asc</option>
                    <option value="incoming_links_desc">incoming_links_desc</option>
                    <option value="last_edit_asc">last_edit_asc</option>
                    <option value="last_edit_desc">last_edit_desc</option>
                    <option value="create_timestamp_asc">create_timestamp_asc</option>
                    <option value="create_timestamp_desc">create_timestamp_desc</option>
                </select>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getArticles: (inputValue, sort) => dispatch(getArticles(inputValue, sort)),
    }
}

export default connect(null,
    mapDispatchToProps
)(SearchBar)