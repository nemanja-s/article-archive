import React, { Component } from 'react';
import axios from "axios";

import classes from './PreviewArticle.css';
import Spinner from '../../components/Spinner/Spinner';

class PreviewArticle extends Component {
  state = {
    previewArticle: null,
    error: false
  };

  componentDidMount() {
    const { doc } = this.props;
    let url = doc.web_url;
    // Parse some type of url before send to server
    if (url.startsWith('https://query.nytimes.com/gst/fullpage.html?res=')) {
      const lastPart = url.split('=').pop();
      url = `https://archive.nytimes.com/query.nytimes.com/gst/fullpage-${lastPart}.html`;
    }
    // Fetch title, description and image for each article
    axios.get(`https://link-preview-api.herokuapp.com/${url}`)
      .then(res => { this.setState({ previewArticle: res.data }) })
      .catch(error => { this.setState({ error: true }) });
  }

  // Return article box with title, description and image
  // with more details showing on hover
  render(){
    const { error, previewArticle } = this.state;
    const { doc } = this.props;

    let article = <Spinner />;
    if (error)
      article = (
        <div className={classes.ArticleBox}>
          <img
            src='https://static.nytimes.com/images/icons/t_logo_291_black.png'
            alt='new-york-time logo' />
          <h2 className={classes.Title}>Article not found!</h2>
          <p className={classes.Description}>
            We’re sorry, we seem to have lost this article,
            but we don’t want to lose you.</p>
        </div>
      );
    if (previewArticle)
      article = (
        <div className={classes.ArticleBox}>
          <img
            src={previewArticle.image === 'N/A' ?
                'https://static.nytimes.com/images/icons/t_logo_291_black.png'
                : previewArticle.image}
            alt='article' />
          <div className={classes.ArticleDetails}>
            <p className={classes.Headline}>
              {doc.headline.print_headline ?
                doc.headline.print_headline
                : doc.headline.main}
            </p>
            <p className={classes.Author}>
              {doc.byline !== null ?
                doc.byline.original
                : null}
            </p>
            <p>Published: {doc.pub_date}</p>
            <p>Type of article: {doc.type_of_material}</p>
            <p>Total words: {doc.word_count}</p>
            <a className={classes.BtnText}
               href={doc.web_url}
               target="_blank">Read Article</a>
          </div>
          <h2 className={classes.Title}>{previewArticle.title}</h2>
          <p className={classes.Description}>
            {previewArticle.description.substring(0, 200)}
          </p>
        </div>
      );
    return article;
  }
}

export default PreviewArticle;