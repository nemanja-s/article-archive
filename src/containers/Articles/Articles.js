import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadPage from '../../components/LoadPage/LoadPage';
import classes from './Articles.css';
import * as actions from '../../store/actions/actionCreators';

class Articles extends Component {
  state = {
    from: 0,
    to: 20,
    pageCounter: 1
  };

  componentDidMount() {
    this.props.onFetchArticles(this.props.year, this.props.month);
  }

  // Change state data for using as props in LoadPage
  // component and loading "pages"
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
    let loadArticles = null;
    let copyright = null;
    if(this.props.articles) {
      loadArticles = <LoadPage
        articles={this.props.articles}
        from={this.state.from}
        to={this.state.to}/>;
      copyright = this.props.articles.copyright;
    }
    let prevButton = null;
    if(this.state.pageCounter > 1) {
      prevButton = <p>
        <a href="javascript:void(0)"
           className={classes.BtnText}
           onClick={this.prevPage}>&larr; Prev page
        </a></p>;
    }

    let results = null;
    if (this.props.articles)
      results = (
        <div>
          <div className={classes.Results}>
            <div className={classes.Heading}>
              <h2 id="all-articles" className={classes.HeadingText}>
                Your searched articles:
              </h2>
              <h2 className={classes.HeadingPage}>
                Page {this.state.pageCounter}
              </h2>
            </div>
            <div className={classes.Articles}>
              {loadArticles}
            </div>
            <div className={classes.ArticlesButton}>
              {prevButton}
              <p><a href="javascript:void(0)"
                    className={classes.BtnText}
                    onClick={this.nextPage}>
                Next page &rarr;
              </a></p>
            </div>
          </div>
          <div className={classes.Footer}>
            <div className={classes.FooterText}>
              {copyright}<br/>Page built by Nemanja Stojanovic
            </div>
          </div>
        </div>
      );

    return results;
  }
}

const mapStateToProps = state => {
  return {
    year: state.year,
    month: state.month,
    articles: state.articles
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: (year, month) => dispatch(actions.fetchArticles(year, month))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);