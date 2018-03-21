import React, { Component } from 'react';
import LoadArticles from '../../components/LoadArticles/LoadArticles';
import classes from './Articles.css';

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
    const url = new URL(
      "https://api.nytimes.com/svc/archive/v1/" + this.props.year + "/" + this.props.month + ".json");
    url.searchParams.append("api-key", "74f9b23fb5884f49a5694562ff4a358b");
    const request = new Request(
      url,
      {
        method: "GET",
        mode: "cors"
      }
    );
    fetch(request)
      .then(response => response.json())
      .then(json => {
        this.setState({data: json})
      })
      .catch(error => {
        console.log(error);
        document.getElementById('msgAlert').innerHTML = "NYT archive doesn't respond. Please reload page and try again";
      });
  }

  render(){
    let loadArticles = null;
    let copyright = null;
    if(this.state.data) {
      loadArticles = <LoadArticles data={this.state.data} from={this.state.from} to={this.state.to}/>;
      copyright = this.state.data.copyright;
    }
    let prevButton = null;
    if(this.state.pageCounter > 1) {
      prevButton = <p><a href="#" className="btn-text" onClick={this.prevPage}>&larr; Prev page</a></p>;
    }

    return(
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
            <p><a href="#" className={classes.BtnText} onClick={this.nextPage}>
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
    )
  }
}

export default Articles;