import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import RetailerDetail from './components/RetailerDetail';
import Retailers from './components/Retailers';
import HeadBar from './components/Headbar';
import SideBar from './components/Sidebar';

class App extends Component {
  render() {
    return (<div className="wrapper">
      <HeadBar/>
      <SideBar/>
      <div className="content">
        {this.props.children}
      </div>
    </div>);
  }
}

class Routes extends Component {

  // We need to provide a list of routes
  // for our app, and in this case we are
  // doing so from a Root component
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Retailers}/>
          <Route path='/retailer/:id' component={RetailerDetail} />
        </Route>
      </Router>
    );
  }
}

module.exports = Routes;