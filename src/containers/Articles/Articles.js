import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadArticles from '../../components/LoadArticles/LoadArticles';
import classes from './Articles.css';
import * as actions from '../../store/actions/actionCreators';

class Articles extends Component {
  state = {
    from: 0,
    to: 20,
    pageCounter: 1
  };

  // Change state data for using as props in LoadArticles component and loading "pages"
  nextPage = () => {
    this.setState({
      from: this.state.from + 20,
      to: this.state.to + 20,
      pageCounter: this.state.pageCounter + 1
    });
  };

  prevPage = () => {
    this.setState({
      from: this.state.from - 20,
      to: this.state.to - 20,
      pageCounter: this.state.pageCounter - 1
    });
  };

  componentDidMount() {
  }

  render(){
    if (this.props.fetch)
      this.props.onFetchArticles(this.props.year, this.props.month);
    return <h1>Super</h1>;
    // let loadArticles = null;
    // let copyright = null;
    // if(this.state.data) {
    //   loadArticles = <LoadArticles data={this.state.data} from={this.state.from} to={this.state.to}/>;
    //   copyright = this.state.data.copyright;
    // }
    // let prevButton = null;
    // if(this.state.pageCounter > 1) {
    //   prevButton = <p><a href="# " className="btn-text" onClick={this.prevPage}>&larr; Prev page</a></p>;
    // }
    //
    // return(
    //   <div>
    //     <div className={classes.Results}>
    //       <div className={classes.Heading}>
    //         <h2 id="all-articles" className={classes.HeadingText}>
    //           Your searched articles:
    //         </h2>
    //         <h2 className={classes.HeadingPage}>
    //           Page {this.state.pageCounter}
    //         </h2>
    //       </div>
    //       <div className={classes.Articles}>
    //         {loadArticles}
    //       </div>
    //       <div className={classes.ArticlesButton}>
    //         {prevButton}
    //         <p><a href="# " className={classes.BtnText} onClick={this.nextPage}>
    //           Next page &rarr;
    //         </a></p>
    //       </div>
    //     </div>
    //     <div className={classes.Footer}>
    //       <div className={classes.FooterText}>
    //         {copyright}<br/>Page built by Nemanja Stojanovic
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}

const mapStateToProps = state => {
  return {
    year: state.year,
    month: state.month,
    articles: state.articles,
    fetch: state.fetch
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: (year, month) => dispatch(actions.fetchArticles(year, month))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);