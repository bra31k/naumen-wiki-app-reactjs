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
            suggestion: [],
            shouldSuggestion: false,
        }

        this.inputClick = this.inputClick.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.suggestionClick = this.suggestionClick.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('naumen-wiki-app')) {
            let suggestion = JSON.parse(localStorage.getItem('naumen-wiki-app'))
            suggestion.map(sug => {
                this.setState(prevState => ({
                    suggestion: [...prevState.suggestion, sug]
                }))
            })
        }
    }

    componentDidUpdate(prevState) {
        if (prevState !== this.state && this.state.inputValue.length > 0){
            this.props.getArticles(this.state.inputValue, this.state.sort)
            localStorage.setItem('naumen-wiki-app', JSON.stringify(this.state.suggestion))
        }
    }

    suggestionClick(value) {
        this.setState({
            inputValue: value
        })
    }


    handleChangeSelect(event) {
        this.setState({
            sort: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const inputValue = event.target.searchWiki.value;
        this.setState({
            inputValue: inputValue
        })
        if (!this.state.suggestion.includes(inputValue))
        {
            if (this.state.suggestion.length >= 3) {
                this.setState({
                    suggestion: this.state.suggestion.splice(1),
                })
            }
            this.setState(prevState => ({
                suggestion: [...prevState.suggestion, inputValue],
            }))
        }
    }

    inputClick() {
        this.setState({
            shouldSuggestion: !this.state.shouldSuggestion
        })
    }



    render() {
        return (
            <div className="App">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input
                        type="text"
                        name="searchWiki"
                        placeholder="Искать здесь..."
                        autoComplete="off"
                        onClick={this.inputClick}
                    />
                    <ul>
                        {this.state.shouldSuggestion
                            ? this.state.suggestion.map(sug => (
                            <li key={this.state.suggestion.indexOf(sug)}
                                onClick={() => this.suggestionClick(sug)}>
                                {sug}
                            </li>
                            ))
                            : null}
                    </ul>
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

export default connect(null, mapDispatchToProps)(SearchBar)