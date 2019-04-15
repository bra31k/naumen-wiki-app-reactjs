import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAIL,
    GET_ARTICLES_ADD_SUCCESS,
} from '../actions/articlesActions'

const initialState = {
    articles: [],
    isLoading: false,
    error: "",
}

export function articleReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ARTICLES_REQUEST:
            return { ...state, isLoading: true, error: "" }

        case  GET_ARTICLES_SUCCESS:
            return { ...state, isLoading: false, articles: action.payload }

        case GET_ARTICLES_ADD_SUCCESS:
            return { ...state, isLoading: false, articles: state.articles.concat(action.payload)}

        case GET_ARTICLES_FAIL:
            return { ...state, isLoading: false, error: action.payload }

        default:
            return state
    }
}