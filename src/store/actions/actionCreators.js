import * as actionTypes from './actionTypes';
import axios from 'axios';

export const changeMessage = (message) => {
  return {
    type: actionTypes.CHANGE_MESSAGE,
    message: message
  }
};

export const setChoosenDate = (year, month) => {
  return {
    type: actionTypes.SET_CHOOSEN_DATE,
    year: year,
    month: month
  }
};

export const fetchArticlesStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_START
  }
};

export const fetchArticlesSuccess = (articles) => {
  return {
    type: actionTypes.FETCH_ARTICLES_SUCCESS,
    articles: articles,
    message: 'We founded articles, wait just a little bit...'
  }
};

export const fetchArticlesFail = (error) => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAIL,
    message: "NYT server doesn't respond. Reload page and try again"
  }
};

export const fetchArticles = (year, month) => {
  return dispatch => {
    const apiKey1 = '62260d8c037d49458489c69ad635725c';
    // const apiKey2 = '74f9b23fb5884f49a5694562ff4a358b';
    dispatch(fetchArticlesStart());
    let url = "https://api.nytimes.com/svc/archive/v1/" + year
      + "/" + month + ".json?api-key=" + apiKey1;
    axios.get(url)
      .then(response => {
        dispatch(fetchArticlesSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchArticlesFail(error))
      })
  }
};