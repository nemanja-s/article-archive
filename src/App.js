import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from './hoc/Auxiliary/Auxiliary';
import Video from './hoc/Video/Video';
import DateSelector from './components/DateSelector/DateSelector';
import Articles from './containers/Articles/Articles';

class App extends Component {
  render() {
    let articles = null;
    if (this.props.fetching)
      articles = <Articles />;
    return(
      <Aux>
        <Video>
          <DateSelector />
        </Video>
        {articles}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching
  }
};

export default connect(mapStateToProps)(App);
