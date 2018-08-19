import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import classes from './PreviewArticle.css';
import Spinner from '../../components/Spinner/Spinner';
import * as actions from '../../store/actions/actionCreators';


class PreviewArticle extends Component {
  state = {
    previewArticle: null,
    error: false
  };

  // Fetch title, description and image for each article
  componentDidMount() {
    let url = this.props.doc.web_url;
    if (url.startsWith('https://query.nytimes.com/gst/fullpage.html?res=')) {
      const lastPart = url.split('=').pop();
      url = `https://archive.nytimes.com/query.nytimes.com/gst/fullpage-${lastPart}.html`;
    }
    axios.get(`https://link-preview-api.herokuapp.com/${url}`)
      .then(response => {
        this.setState({ previewArticle: response.data });
        this.props.onMessageChanged('DONE! Scroll down or click on arrow');
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true })
      });
  }

  // Return article box with title, description and image
  // with more details showing on hover
  render(){
    let article = <Spinner />;
    if (this.state.error)
      article = (
        <div className={classes.ArticleBox}>
          <img src='https://static.nytimes.com/images/icons/t_logo_291_black.png' />
          <h2 className={classes.Title}>Article not found!</h2>
          <p className={classes.Description}>
            We’re sorry, we seem to have lost this article,
            but we don’t want to lose you.</p>
        </div>
      );
    if (this.state.previewArticle)
      article = (
        <div className={classes.ArticleBox}>
          <img
            src={
              this.state.previewArticle.image === 'N/A' ?
                'https://static.nytimes.com/images/icons/t_logo_291_black.png'
                : this.state.previewArticle.image}
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
          <h2 className={classes.Title}>{this.state.previewArticle.title}</h2>
          <p className={classes.Description}>{this.state.previewArticle.description.substring(0, 200)}</p>
        </div>
      );
    return article;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMessageChanged: (message) => dispatch(actions.changeMessage(message))
  }
};

export default connect(null, mapDispatchToProps)(PreviewArticle);