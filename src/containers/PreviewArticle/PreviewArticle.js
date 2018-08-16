import React, { Component } from 'react';
import axios from 'axios';

import classes from './PreviewArticle.css';
import Spinner from '../../components/UI/Spinner/Spinner';


class PreviewArticle extends Component {
  state = {
    articleInfo: null
  };

  // Fetch title, description and image for each article
  componentDidMount() {
    const previewUrl = this.props.doc.web_url;
    axios.get("https://link-preview-api.herokuapp.com/" + previewUrl)
      .then(response => {
        this.setState({articleInfo: response.data});
        document.getElementById('msgAlert').innerHTML = "DONE! Scroll down or click on arrow";
        document.getElementById('searchBtn').classList.remove('not-active');
        document.getElementById('scroll').style.display = "block";
      })
      .catch(error => {
        console.log(error);
        document.getElementById('msgAlert').innerHTML =
          "Sorry, something went wrong. Please try again later.";
        document.getElementById('searchBtn').classList.add('not-active');
      });
  }

  // Return article box with title, description and image
  // with more details showing on hover
  render(){
    let article = this.state.articleInfo ?
      (<div className={classes.ArticleBox}>
        <img
          src={
            this.state.articleInfo.image === 'N/A' ?
              'https://static.nytimes.com/images/icons/t_logo_291_black.png'
              : this.state.articleInfo.image}
          alt='article' />
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
        <h2 className={classes.Title}>{this.state.articleInfo.title}</h2>
        <p className={classes.Description}>{this.state.articleInfo.description}</p>
      </div>)
      : <Spinner />;
    return article;
  }
}

export default PreviewArticle;