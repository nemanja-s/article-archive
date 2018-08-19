import React from 'react';
import PreviewArticle from '../../containers/PreviewArticle/PreviewArticle';

const loadPage = (props) => {
  let newArticles = [];
  for(let i = props.from; i < props.to; i++){
    newArticles.push(
      <PreviewArticle
        key={props.articles.response.docs[i]._id}
        doc={props.articles.response.docs[i]}/>
    )
  }
  return <div>{newArticles}</div>
};

export default loadPage;