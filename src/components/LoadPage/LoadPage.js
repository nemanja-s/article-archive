import React, { Component } from 'react';
import { connect } from 'react-redux';

import PreviewArticle from '../../containers/PreviewArticle/PreviewArticle';
import * as actions from '../../store/actions/actionCreators';

// "Page" with 20 articles styled using info from LinkPreview API
class LoadPage extends Component {
  componentWillMount() {
    this.props.onPageLoaded('DONE! Scroll down or click on arrow');
  }

  componentDidUpdate() {
    this.props.onPageLoaded('DONE! Scroll down or click on arrow');
  }

  render() {
    const { from, to, articles } = this.props;
    let newArticles = [];
    for(let i = from; i < to; i++){
      newArticles.push(
        <PreviewArticle
          key={articles.response.docs[i]._id}
          doc={articles.response.docs[i]} />
      )
    }
    return <div>{newArticles}</div>;
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onPageLoaded: (message) => dispatch(actions.showInfo(message))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadPage);