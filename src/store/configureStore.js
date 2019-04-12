import { createStore, applyMiddleware } from 'redux'
import { articleReducer } from '../reducers/articles'
import thunk from 'redux-thunk'

export const store = createStore(articleReducer, applyMiddleware(thunk))