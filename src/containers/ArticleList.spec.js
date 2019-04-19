import React from 'react'
import { ArticleList } from './ArticleList'
import { shallow } from 'enzyme'

describe('ArticleList', () => {
    const props = {
        store: {
            isLoading: false,
            error: null,
            articles: [],
        }
    }

    describe('ArticleList initial', () => {
        const articleList = shallow(<ArticleList {...props} />)

        it('renders properly', () => {
            expect(articleList).toMatchSnapshot()
        })
    })


    describe('ArticleList isLoading', () => {

        let nextProps = {
            store: {
                isLoading: true,
                error: null,
                articles: [
                    {title: 'hello', snippet: 'world'}
                ],
            }
        }

        const articleList = shallow(<ArticleList {...nextProps} />)

        it('renders properly', () => {
            expect(articleList).toMatchSnapshot()
        })

        it('renders preloader', () => {
            expect(articleList.find('p').first().text()).toEqual('Загружаю....')
        })
    })

    describe('ArticleList error', () => {

        let nextProps = {
            store: {
                isLoading: false,
                error: 'error',
                articles: [
                    {title: 'hello', snippet: 'world'}
                ],
            }
        }

        const articleList = shallow(<ArticleList {...nextProps} />)

        it('renders properly', () => {
            expect(articleList).toMatchSnapshot()
        })

        it('renders error', () => {
            expect(articleList.find('p').first().text()).toEqual(`Произошла ошибка: ${nextProps.store.error}`)
        })
    })

    describe('ArticleList render Article', () => {

        let nextProps = {
            store: {
                isLoading: false,
                error: null,
                articles: [
                    {title: 'hello', snippet: 'world'}
                ],
            }
        }

        const articleList = shallow(<ArticleList {...nextProps} />)

        it('renders properly', () => {
            expect(articleList).toMatchSnapshot()
        })

        it('renders Article', () => {
            expect(articleList.find('Article')).toHaveLength(nextProps.store.articles.length)
        })
    })

})