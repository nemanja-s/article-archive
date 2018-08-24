import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Please select year and month',
  loading: false,
  articles: null,
  from: 0,
  to: 20,
  pageCounter: 1,
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
        articles: null,
        from: 0,
        to: 20,
        pageCounter: 1,
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
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        from: state.from + 20,
        to: state.to + 20,
        pageCounter: state.pageCounter + 1,
      };
    case actionTypes.PREVIOUS_PAGE:
      return {
        ...state,
        from: state.from - 20,
        to: state.to - 20,
        pageCounter: state.pageCounter - 1,
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

