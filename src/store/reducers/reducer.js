import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Please select year and month',
  loading: false,
  articles: null,
  showArrow: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case actionTypes.FETCH_ARTICLES_START:
      return {
        ...state,
        loading: true,
        showArrow: false
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
    case actionTypes.SHOW_INFO_TO_USER:
      return {
        ...state,
        message: action.message,
        loading: false,
        showArrow: true
      };
    default:
      return state;
  }
};

export default reducer;

