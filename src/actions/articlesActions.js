import axios from 'axios';

export const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAIL = 'GET_ARTICLES_FAIL';


const url = "https://en.wikipedia.org/w/api.php?"


export const getArticles = (inputValue, sort) => {
    return function (dispatch) {
        dispatch ({
            type:  GET_ARTICLES_REQUEST
        });
        axios.get(url, {
            params: {
                action: 'query',
                list: 'search',
                srsearch: inputValue,
                utf8: '',
                format: 'json',
                origin: '*' ,
                srsort: sort,
            }
            }).then(resourse => {
                if (resourse.status === 200){
                    if (resourse.headers['mediawiki-api-error'] === undefined) {
                        dispatch({
                            type: GET_ARTICLES_SUCCESS,
                            payload: resourse.data.query.search,
                        });
                    }
                    else {
                        dispatch({
                            type: GET_ARTICLES_FAIL,
                            payload: resourse.headers['mediawiki-api-error'],
                        });
                    }
                } else {
                    dispatch({
                        type: GET_ARTICLES_FAIL,
                        payload: resourse.status,
                    });
                }
            })
                .catch(error => {
                    throw(error.response);
                })

    }
}