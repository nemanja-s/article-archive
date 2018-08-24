import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadPage from '../../components/LoadPage/LoadPage';
import classes from './Articles.css';

class Articles extends Component {
  state = {
    from: 0,
    to: 20,
    pageCounter: 1
  };

  // Change state data for previewing 20 new(or old) articles
  // State send as a props to <LoadPage /> component
  nextPage = () => {
    this.setState(prevState => ({
      from: prevState.from + 20,
      to: prevState.to + 20,
      pageCounter: prevState.pageCounter + 1
    }));
  };

  prevPage = () => {
    this.setState(prevState => ({
      from: prevState.from - 20,
      to: prevState.to - 20,
      pageCounter: prevState.pageCounter - 1
    }));
  };

  render(){
    const { from, to, pageCounter } = this.state;
    const { articles } = this.props;
    let prevButton = null;
    if(pageCounter > 1) {
      prevButton = <p>
        <a href="#all-articles"
           className={classes.BtnText}
           onClick={this.prevPage}>&larr; Prev page
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
                  onClick={this.nextPage}>
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
    articles: state.articles
  }
};

export default connect(mapStateToProps)(Articles);