var React = require('react');
AppActions = require('../actions/AppActions');
AppStore = require('../stores/AppStore');

function getAppState(){
  return {

  }
}

var App = React.createClass({
  getInitialState: function(){
    return getAppState();
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
  },

  componentUnmount: function(){
    AppStore.removeChangeListener(ths._onChange);
  },

  render: function(){
    return(
        <div>Hello world</div>
    );
  },

  _onChange: function(){
    this.setState(getAppState());
  }
});

module.exports = App;