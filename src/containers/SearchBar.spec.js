import React from 'react'
import { SearchBar } from './SearchBar'
import { shallow } from 'enzyme'

describe('SearchBar', () => {

    const getArticlesMock = jest.fn()

    const props = {
        getArticles: getArticlesMock
    }

    describe('SearchBar initial', () => {
        const searchBar = shallow(<SearchBar {...props} />)

        it('SearchBar properly', () => {
            expect(searchBar).toMatchSnapshot()
        })
    })
})