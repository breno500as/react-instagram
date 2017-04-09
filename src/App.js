import React, { Component } from 'react';
import Header from './component/Header';
import Timeline from './component/Timeline';

class App extends Component {
  render() {
    return (
    <div id="root">
      <div className="main">
        <Header/>
        <Timeline publicUser={this.props.params.publicUser} />
      </div>
    </div>
    );
  }
}

export default App;