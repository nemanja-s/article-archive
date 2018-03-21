import React from 'react';
import PreviewArticle from '../../containers/PreviewArticle/PreviewArticle';

const loadArticles = (props) => {
  let newArticles = [];
  for(let i = props.from; i < props.to; i++){
    newArticles.push(<PreviewArticle key={props.data.response.docs[i]._id} doc={props.data.response.docs[i]}/>)
  }
  return <div>{newArticles}</div>
};

export default loadArticles;