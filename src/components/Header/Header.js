import React from 'react';

const header = props => (
  <header id="header" className="header">
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="../img/NYC-Traffic.mp4" type="video/mp4" />
        <source src="../img/NYC-Traffic.webm" type="video/webm" />
        Your browser does not supported video background!
      </video>
    </div>
    <div className="bg-video__overlay" />
    <div className="header__logo-box">
      <img src="../img/logo.png" alt="logo" className="logo" />
    </div>
    <div className="header__text-box">
      <h1 className="heading-primary">
        <span className="heading-primary--main">
          Article Archive
        </span>
        <span className="heading-primary--sub">
          Explore more than 13 million NYT articles, since 1851 year!
        </span>
      </h1>
      {props.children}
    </div>
    <a href="#all-articles" className="header__scroll-box">
      <img src="../img/scroll.gif" alt="logo" id="scroll" className="scroll-icon" />
    </a>
  </header>
);

export default header;