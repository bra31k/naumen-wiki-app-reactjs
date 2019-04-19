import React from 'react'
import { SearchBar } from './SearchBar'
import { shallow } from 'enzyme'

describe('SearchBar', () => {

    const getArticlesMock = jest.fn()

    const props = {
        getArticles: getArticlesMock
    }

    const initialState = {
        inputValue: "",
        searchValue: "",
        sort: "relevance",
        sroffset: 0,
        suggestion: [],
        shouldSuggestion: false,
        theme: 'light',
    }

    const searchBar = shallow(<SearchBar {...props} />)

    describe('SearchBar initial', () => {


        it('SearchBar properly', () => {
            expect(searchBar).toMatchSnapshot()
        })

        it('initialize SearchBar with initial state', () => {
            expect(searchBar.state()).toEqual(initialState)
        })

    })

    describe('when typing into search input', () => {

        const value = 'hello'

        beforeEach(() => {
            searchBar.find('#search').simulate('change', {
                target: {
                    value: value,
                },
            })
        })

        it('updates inputValue field in state', () => {
            expect(searchBar.state().inputValue).toEqual(value)
        })
    })

    describe('when submiting the form', () => {

        beforeEach(() => {
            searchBar.find('form').simulate('submit', {
                preventDefault: () => {},
            })
        })


        it('update state', () => {
            expect((searchBar.state().inputValue, searchBar.state().sroffset)).toEqual((searchBar.state().searchValue, 0))
        })
    })

    describe('when change select', () => {

        const sortValue = "just_match"

        beforeEach(() => {
            searchBar.find('select').simulate('change', {
                target: {
                    value: "just_match",
                },
            })
        })

        it('updates sort in state', () => {
            expect(searchBar.state().sort).toEqual(sortValue)
        })

    })


    describe('when click on change theme button', () => {


        beforeEach(() => {
            searchBar.find('#button-change-theme').simulate('click', {
            })
        })

        it('updates sort in state', () => {
            expect(searchBar.state().theme).toEqual("dark")
        })

    })

    describe('when suggestion click', () => {

        beforeEach(() => {
            searchBar.find('li').simulate('click', {
                value: 'hello'
            })
        })

        it('updates sort in state', () => {
            expect(searchBar.state().searchValue).toEqual('hello')
        })

    })

    describe('componentDidUpdate ', () => {

        const state = {
            ...initialState,
            searchValue: 'hello'
        }

        beforeEach(() => {
            searchBar.setState(state)
        })

        it('loads article', () => {
            expect(searchBar.instance().props.getArticles).toBeCalled();
        })
    })

})