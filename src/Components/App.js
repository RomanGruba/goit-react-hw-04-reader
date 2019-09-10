import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Reader from './Reader';

// const App = ({ items }) => {
//   return <Route path="/reader" render={() => <Reader items={items} />} />;
// };

// export default App;

export default class App extends Component {
  state = {};

  render() {
    return (
      <Route
        path="/reader"
        render={props => <Reader {...props} items={this.props.items} />}
      />
    );
  }
}
