import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadPage from '../../components/LoadPage/LoadPage';
import * as actions from '../../store/actions/actionCreators';
import classes from './Articles.css';

class Articles extends Component {
  renderPrevButton() {
    const { pageCounter, onPreviousPage } = this.props;
    return (pageCounter > 1) ?
      <p><a href="#all-articles"
           className={classes.BtnText}
           onClick={() => onPreviousPage()}>&larr; Prev page
      </a></p> : null;
  }

  render(){
    const { articles, from, to, pageCounter, onPageNext } = this.props;

    return articles ? (
      <div>
        <div className={classes.Results}>
          <div className={classes.Heading}>
            <h2 id="all-articles" className={classes.HeadingText}>
              We found {articles.response.docs.length} articles:
            </h2>
            <h2 className={classes.HeadingPage}>
              Page {pageCounter} of {Math.ceil(articles.response.docs.length / 20)}
            </h2>
          </div>
          <div className={classes.Articles}>
            <LoadPage from={from} to={to}/>
          </div>
          <div className={classes.ArticlesButton}>
            {this.renderPrevButton()}
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