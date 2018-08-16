import React, { Component } from 'react';
import Aux from './hoc/Auxiliary/Auxiliary';
import Video from './hoc/Video/Video';
import Selector from './components/Selector/Selector';
import Articles from './containers/Articles/Articles';

class App extends Component {
  render() {
    return(
      <Aux>
        <Video>
          <Selector />
        </Video>
        <Articles />
      </Aux>
    )
  }
}

export default App;
