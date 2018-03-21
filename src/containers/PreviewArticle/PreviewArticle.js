import React, { Component } from 'react';

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
        <div className="article">
          <img className="article--image" src={this.state.data.image} />
          <div className="article--image--details">
            <p className="details__headline">
              {this.props.doc.headline.print_headline ? this.props.doc.headline.print_headline : this.props.doc.headline.main}
            </p>
            <p className="details__author">
              {this.props.doc.byline !== null ? this.props.doc.byline.original : null}
            </p>
            <p>Published: {this.props.doc.pub_date}</p>
            <p>Type of article: {this.props.doc.type_of_material}</p>
            <p>Total words: {this.props.doc.word_count}</p>
            <a className="btn-text" href={this.props.doc.web_url} target="_blank">Read Article</a>
          </div>
          <h2 className="article--title">{this.state.data.title}</h2>
          <p className="article--description">{this.state.data.description}</p>
        </div>
        : null
    )
  }
}

export default PreviewArticle;