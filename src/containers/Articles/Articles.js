import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadPage from '../../components/LoadPage/LoadPage';
import * as actions from '../../store/actions/actionCreators';
import classes from './Articles.css';

class Articles extends Component {
  render(){
    const { articles, from, to, pageCounter, onPageNext, onPreviousPage } = this.props;
    let prevButton = null;
    if(pageCounter > 1) {
      prevButton = <p>
        <a href="#all-articles"
           className={classes.BtnText}
           onClick={() => onPreviousPage()}>&larr; Prev page
        </a></p>;
    }

    return articles ? (
      <div>
        <div className={classes.Results}>
          <div className={classes.Heading}>
            <h2 id="all-articles" className={classes.HeadingText}>
              Your searched articles:
            </h2>
            <h2 className={classes.HeadingPage}>
              Page {pageCounter}
            </h2>
          </div>
          <div className={classes.Articles}>
            <LoadPage from={from} to={to}/>
          </div>
          <div className={classes.ArticlesButton}>
            {prevButton}
            <p><a href="#all-articles"
                  className={classes.BtnText}
                  onClick={() => onPageNext()}>
              Next page &rarr;
            </a></p>
          </div>
        </div>
        <div className={classes.Footer}>
          <div className={classes.FooterText}>
            {articles.copyright}<br/>Page built by Nemanja Stojanovic
          </div>
        </div>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    from: state.from,
    to: state.to,
    pageCounter: state.pageCounter
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onPageNext: () => dispatch(actions.nextPage()),
    onPreviousPage: () => dispatch(actions.previousPage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);