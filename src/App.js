import React, { Component } from 'react';
import Aux from './components/Auxiliary/Auxiliary';
import Header from './components/Header/Header';
import Selector from './containers/Selector/Selector';
import Articles from './containers/Articles/Articles';

class App extends Component {
  state = {};

  dateHandler = (date) => {
    this.setState({
      year: date[0],
      month: date[1]
    })
  };

  render() {
    let articles = null;
    if(this.state.year) {
      articles = <Articles year={this.state.year} month={this.state.month} />
    }

    return(
      <Aux>
        <Header>
          <Selector getDate={this.dateHandler} />
        </Header>
        {articles}
      </Aux>
    )
  }
}

export default App;
