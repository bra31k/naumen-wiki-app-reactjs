import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAIL,
    GET_ARTICLES_ADD_SUCCESS,
} from '../actions/articlesActions'



import {articleReducer, initialState} from './articles'


describe('Articles reducer', () => {

    it('GET_ARTICLES_REQUEST', () => {
        const action = {
            type: GET_ARTICLES_REQUEST,
        }

        expect(articleReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
        })
    })

    it('GET_ARTICLES_SUCCESS', () => {

        const state = {
            articles: [],
            isLoading: true,
            error: null,
        }

        const action = {
            type: GET_ARTICLES_SUCCESS,
            payload: ['articles']
        }

        expect(articleReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
            articles: action.payload,
        })
    })

    it('GET_ARTICLES_ADD_SUCCESS', () => {

        const state = {
            articles: ['articles'],
            isLoading: false,
            error: null,
        }

        const action = {
            type: GET_ARTICLES_ADD_SUCCESS,
            payload: ['articles']
        }

        expect(articleReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
            articles: state.articles.concat(action.payload),
        })
    })

    it('GET_ARTICLES_FAIL', () => {

        const state = {
            articles: [],
            isLoading: false,
            error: null,
        }

        const action = {
            type: GET_ARTICLES_FAIL,
            payload: 'error'
        }

        expect(articleReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
            error: action.payload,
        })
    })

})