import React, { Component, Fragment } from 'react';
import Home from './View/Home'
import Header from './View/Header'

class App extends Component {
  render(){
    return (
      <Fragment>
        <Header />
        <div className="app-container margin-t30">
          <Home />
        </div>
      </Fragment>
    );
  }
}

export default App;
