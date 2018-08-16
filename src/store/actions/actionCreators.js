import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchArticlesStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_START
  }
};

export const fetchArticlesSuccess = (articles) => {
  return {
    type: actionTypes.FETCH_ARTICLES_SUCCESS,
    articles: articles
  }
};

export const fetchArticlesFail = (error) => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAIL,
    error: error
  }
};

export const fetchArticles = (year, month) => {
  return dispatch => {
    dispatch(fetchArticlesStart());
    let url = "http://api.nytimes.com/svc/archive/v1/" + year
      + "/" + month + ".json?api-key=62260d8c037d49458489c69ad635725c";
    axios.get(url)
      .then(response => {
        dispatch(fetchArticlesSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchArticlesFail(error))
      })
  }
};