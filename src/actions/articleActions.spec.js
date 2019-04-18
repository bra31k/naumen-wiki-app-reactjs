import configureMockStore from 'redux-mock-store'

import thunk from 'redux-thunk'


import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAIL,
    GET_ARTICLES_ADD_SUCCESS,
} from './articlesActions'
import { getArticles } from './articlesActions'

import moxios from 'moxios'

import expect from 'expect'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Article actions', () => {

    describe('async actions', () => {

        beforeEach(function () {
            moxios.install()
        })

        afterEach(function () {
            moxios.uninstall()
        })

        it('creates GET_ARTICLES_SUCCESS when fetching articles has been done', () => {

            moxios.wait(function () {
                let request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        query: {
                            search: [1, 2, 3]
                        }
                    }
                })
            })

            const expectedActions = [
                {
                    type: GET_ARTICLES_REQUEST,
                },
                {
                    type: GET_ARTICLES_SUCCESS,
                    payload: [1, 2, 3],
                },
            ]

            const store = mockStore({})

            return store.dispatch(getArticles()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })


        it('creates GET_ARTICLES_ADD_SUCCESS when articles news has been done', () => {

            moxios.wait(function () {
                let request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        query: {
                            search: [1, 2, 3]
                        }
                    }
                })
            })

            const expectedActions = [
                {
                    type: GET_ARTICLES_REQUEST,
                },
                {
                    type: GET_ARTICLES_ADD_SUCCESS,
                    payload: [1, 2, 3],
                },
            ]

            const store = mockStore({})

            return store.dispatch(getArticles('hello', 'relevance', 10)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })


        it('creates GET_ARTICLES_FAIL when receiving error 404', () => {

            moxios.wait(function () {
                let request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 404,
                })
            })

            const expectedActions = [
                {
                    type: GET_ARTICLES_REQUEST,
                },
                {
                    type: GET_ARTICLES_FAIL,
                    payload: 'Error: Request failed with status code 404',
                },
            ]

            const store = mockStore({})

            return store.dispatch(getArticles()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })

        it('creates GET_ARTICLES_FAIL if no articles found', () => {

            moxios.wait(function () {
                let request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: {
                        query: {
                            search: []
                        }
                    }
                })
            })

            const expectedActions = [
                {
                    type: GET_ARTICLES_REQUEST,
                },
                {
                    type: GET_ARTICLES_FAIL,
                    payload: 'по вашему запросу ничего не найдено',
                },
            ]

            const store = mockStore({})

            return store.dispatch(getArticles()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })

    })
})


