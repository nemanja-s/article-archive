import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Please select year and month',
  year: '',
  month: '',
  fetching: false,
  articles: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case actionTypes.SET_CHOOSEN_DATE:
      return {
        ...state,
        year: action.year,
        month: action.month,
        fetching: true
      };
    case actionTypes.FETCH_ARTICLES_START:
      return {
        ...state
      };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        message: action.message
      };
    case actionTypes.FETCH_ARTICLES_FAIL:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};

export default reducer;

