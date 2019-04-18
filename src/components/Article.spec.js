import React from 'react'
import { Article } from './Article'
import { shallow } from 'enzyme'

describe('Article component', () => {
    const props = {
        title: 'hello',
        snippet: 'world'
    }

    describe('Article initial', () => {
        const article = shallow(<Article {...props} />)

        it('renders properly', () => {
            expect(article).toMatchSnapshot()
        })
    })
})