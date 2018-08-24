import React, { Component } from 'react';

import Aux from './hoc/Auxiliary/Auxiliary';
import Video from './hoc/Video/Video';
import DateSelector from './components/DateSelector/DateSelector';
import Articles from './containers/Articles/Articles';

class App extends Component {
  render() {
    return(
      <Aux>
        <Video>
          <DateSelector />
        </Video>
        <Articles />
      </Aux>
    )
  }
}

export default App;
