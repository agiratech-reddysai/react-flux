import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';
import Griddle from 'griddle-react';
// import Modal from 'react-modal';
import {Link} from 'react-router';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

class Retailers extends React.Component {
  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      retailers: []
    }
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AppActions.receiveRetailers();
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      retailers: AppStore.getRetailers()
    });
  }

  render() {
    return(<div>
      <Griddle results={this.state.retailers} columns={["name","currency","active","id"]} columnMetadata={[{columnName:"active",displayName:"Active",customComponent:ConvBool},
      {columnName:"id",displayName:"Events",customComponent:Event}]}/>
      </div>);
  }
}

export default Retailers;

class ConvBool extends React.Component {
  render() {
    return(<span>{this.props.rowData.active.toString()}</span>);
  }
}

class Event extends React.Component {
  render() {
    return(<div>
      <Link to ={`/retailer/${this.props.rowData.id}`}><i className="fa fa-eye view-icon"></i></Link>
      </div>);
  }
}

//  onClick={this.viewDetails.bind(null,this.props.rowData.id)}