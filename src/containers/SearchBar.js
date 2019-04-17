import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"

import { getArticles } from '../actions/articlesActions'
import "../style/index.css"



class SearchBar extends Component {

    constructor(props) {

        super(props)
        this.state = {
            inputValue: "",
            sort: "relevance",
            sroffset: 0,
            suggestion: [],
            shouldSuggestion: false,
            theme: 'light',
        }

        this.inputClick = this.inputClick.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.suggestionClick = this.suggestionClick.bind(this)
        this.toggleTheme = this.toggleTheme.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('naumen-wiki-app')) {
            let suggestion = JSON.parse(localStorage.getItem('naumen-wiki-app'))
            suggestion.forEach(sug => {
                this.setState(prevState => ({
                    suggestion: [...prevState.suggestion, sug]
                }))
            })
        }
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.inputValue !== this.state.inputValue
            || prevState.sort !== this.state.sort
            || prevState.sroffset !== this.state.sroffset )
            && this.state.inputValue.length > 0)
        {
            this.props.getArticles(this.state.inputValue, this.state.sort, this.state.sroffset)
            localStorage.setItem('naumen-wiki-app', JSON.stringify(this.state.suggestion))
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        if ((document.documentElement.clientHeight + window.scrollY) >= (scrollHeight)) {
            this.setState({
                sroffset: this.state.sroffset + 10,
            })
        }
    }

    suggestionClick = (value) => {
        this.setState({
            inputValue: value,
            sroffset: 0,
        })
    }

    handleChangeSelect = (event) => {
        this.setState({
            sort: event.target.value,
            sroffset: 0,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const inputValue = event.target.searchWiki.value;
        this.setState({
            inputValue: inputValue,
            sroffset: 0,
        })
        if (!this.state.suggestion.includes(inputValue) && inputValue.length>0)
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

    inputClick = () => {
        this.setState({
            shouldSuggestion: !this.state.shouldSuggestion
        })
    }

    toggleTheme = () => {
        const theme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setState({
            theme: theme
        });
        document.documentElement.setAttribute("data-theme", theme);
    }


    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input
                        type="text"
                        name="searchWiki"
                        placeholder="Искать здесь..."
                        autoComplete="off"
                        onClick={this.inputClick}
                    />
                        {this.state.shouldSuggestion
                            ? <ul>{this.state.suggestion.map(sug => (
                            <li key={this.state.suggestion.indexOf(sug)}
                                onClick={() => this.suggestionClick(sug)}>
                                {sug}
                            </li>
                            ))}</ul>
                            : null}
                        <button type="submit" className="button"/>
                </form>
                <select value={this.state.sort} onChange={(event) => this.handleChangeSelect(event)}>
                    <option value="relevance">Relevance</option>
                    <option value="just_match">Just match</option>
                    <option value="none">None</option>
                    <option value="incoming_links_asc">Incoming links asc</option>
                    <option value="incoming_links_desc">Incoming links esc</option>
                    <option value="last_edit_asc">Last edit asc</option>
                    <option value="last_edit_desc">Last edit desc</option>
                    <option value="create_timestamp_asc">Create timestamp asc</option>
                    <option value="create_timestamp_desc">Create timestamp desc</option>
                </select>
                <button className="button-change-theme"
                        onClick={this.toggleTheme}>Change theme</button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    getArticles: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        getArticles: (inputValue, sort, sroffset) => dispatch(getArticles(inputValue, sort, sroffset)),
    }
}

export default connect(null, mapDispatchToProps)(SearchBar)