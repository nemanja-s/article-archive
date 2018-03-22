import React, { Component } from 'react';
import classes from './PreviewArticle.css';

class PreviewArticle extends Component {
  state = {};

  responseHandler = (json) => {
    this.setState({data: json});
    document.getElementById('msgAlert').innerHTML = "DONE! Scroll down or click on arrow";
    document.getElementById('searchBtn').classList.remove('not-active');
    document.getElementById('scroll').style.display = "block";
  };

  errorHandler = (error) => {
    document.getElementById('msgAlert').innerHTML =
      "Too many requests / rate limit exceeded. Try again later";
    document.getElementById('searchBtn').classList.add('not-active');
    console.log(error)
  };

  componentDidMount() {
    let previewUrl = this.props.doc.web_url;
    let apiUrl = new URL(
      "https://api.linkpreview.net?key=5aae148c02e21f14824353c448ef73fb76ccfe2c009e5&q=" + previewUrl);
    const request = new Request(
      apiUrl,
      {
        method: "GET",
      }
    );
    fetch(request)
      .then(response => response.json())
      .then(json => this.responseHandler(json))
      .catch(error => this.errorHandler(error));
  }

  // Return article box with image, title and description and also hidden div with details showing on hover
  render(){
    return(
      this.state.data ?
        <div className={classes.ArticleBox}>
          <img src={this.state.data.image} />
          <div className={classes.ArticleDetails}>
            <p className={classes.Headline}>
              {this.props.doc.headline.print_headline ?
                this.props.doc.headline.print_headline
                : this.props.doc.headline.main}
            </p>
            <p className={classes.Author}>
              {this.props.doc.byline !== null ?
                this.props.doc.byline.original
                : null}
            </p>
            <p>Published: {this.props.doc.pub_date}</p>
            <p>Type of article: {this.props.doc.type_of_material}</p>
            <p>Total words: {this.props.doc.word_count}</p>
            <a className={classes.BtnText}
               href={this.props.doc.web_url}
               target="_blank">Read Article</a>
          </div>
          <h2 className={classes.Title}>{this.state.data.title}</h2>
          <p className={classes.Description}>{this.state.data.description}</p>
        </div>
        : null
    )
  }
}

export default PreviewArticle;