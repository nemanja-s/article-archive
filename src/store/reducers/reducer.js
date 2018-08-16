import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Please select year and month',
  year: '',
  month: '',
  fetch: false,
  error: null,
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
        fetch: true
      };
    case actionTypes.FETCH_ARTICLES_START:
      return {
        ...state
      };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        fetch: false
      };
    case actionTypes.FETCH_ARTICLES_FAIL:
      return {
        ...state,
        error: action.error,
        fetch: false,
        message: "NYT server doesn't respond. Reload page and try again"
      };
    default:
      return state;
  }
};

export default reducer;

