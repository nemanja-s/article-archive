import React from 'react';
import { connect } from 'react-redux';

import classes from './Video.css';
import bgVideo1 from "../../assets/videos/NYC-Traffic.mp4";
import bgVideo2 from "../../assets/videos/NYC-Traffic.webm";
import logo from "../../assets/images/logo.png";
import scroll from "../../assets/images/scroll.gif";

const Video = ({ children, showArrow }) => (
  <header id="header" className={classes.Header}>
    <div className={classes.BgVideo}>
      <video autoPlay muted loop>
        <source src={bgVideo1} type="video/mp4"/>
        <source src={bgVideo2} type="video/webm"/>
        Your browser does not supported video background!
      </video>
    </div>
    <div className={classes.BgVideoOverlay}/>
    <div className={classes.LogoBox}>
      <img src={logo} alt="logo"/>
    </div>
    <div className={classes.TextBox}>
      <h1>
    <span className={classes.HeadingMain}>
      Article Archive
    </span>
    <span className={classes.HeadingSub}>
      Explore more than 13 million NYT articles, since 1851 year!
    </span>
      </h1>
      {children}
    </div>
    <a href="#all-articles">
      <img
        src={scroll}
        alt="logo"
        style={showArrow ? {display: 'block'} : null}/>
    </a>
  </header>
);

const mapStateToProps = state => {
  return {
    showArrow: state.showArrow
  }
};

export default connect(mapStateToProps)(Video);