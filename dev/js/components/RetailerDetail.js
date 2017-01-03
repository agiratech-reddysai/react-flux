import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


class RetailerDetails extends React.Component {
  constructor() {
    super();
    // For our initial state, we just want
    // an empty array of contacts
    this.state = {
      retailer:{},
      rProducts:[],
      rShippingOptions:[],
      rActive:''
    }
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AppActions.getRetailer(this.props.params.id);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      retailer: AppStore.getRetailer(),
      // rId:retailer.id,
      // rName:retailer.name,
      // rBaseUrl:retailer.baseUrl,
      // rCurrency:retailer.currency,
      // rActive:String(this.state.retailer.active),
      // rCrawlDays:retailer.crawlDays,
      // rCrawlTime:retailer.crawlTime,
      rProducts:this.state.retailer.products,
      rShippingOptions:this.state.retailer.shippingOptions
    });
  }
  render() {
    return (<div>
      <Details id={this.state.retailer.id} name={this.state.retailer.name} baseUrl={this.state.retailer.baseUrl} currency={this.state.retailer.currency} active={String(this.state.retailer.active)} crawlDays={this.state.retailer.crawlDays} crawlTime={this.state.retailer.crawlTime}/>
      <h3 className="modal-title">Retailer Shipping Options</h3>
      <div>
          {
            this.state.rShippingOptions.map(function(detail, i){
              return (<ShippingOptionDetail key={i} detail={detail} index={i}/>);
            })
          }
      </div>
      <h3 className="modal-title">Retailer Product Configuration Details</h3>
       <div>
          {
            this.state.rProducts.map(function(detail, i){
              return (<ProductDetail key={detail.id} detail={detail} index={i}/>);
            })
          }
        </div>
      </div>);
  }
}

export default RetailerDetails;

class Details extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.closeDetail = this.closeDetail.bind(this);
  }

  closeDetail() {
    window.history.back();
  }

  render() {
    return(<div>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeDetail}>&times;</button>
          <h3 className="modal-title">Retailer Details</h3>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-4">name</div>
            <div className="col-md-8"><a href={`${this.props.baseUrl}`} target="_blank">{this.props.name}</a></div>
          </div>
          <div className="row">
            <div className="col-md-4">Currency</div>
            <div className="col-md-8">{this.props.currency}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Active</div>
            <div className="col-md-8">{this.props.active}</div>
          </div>
        </div>
      </div>);
  }
}

class ProductDetail extends React.Component {
  render() {
    return(<div>
      <br/>
      <div className="panel-group">
        <div className="panel panel-info">
          <div className="panel-heading">RPC {this.props.index+1}</div>
          <div className="panel-body panel-body-content">
            <div className="row row-odd">
              <div className="col-md-4">Url</div>
              <div className="col-md-8">{this.props.detail.url}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Url Type</div>
              <div className="col-md-8">{this.props.detail.urlType}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Active</div>
              <div className="col-md-8">{this.props.detail.active}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Description</div>
              <div className="col-md-8">{this.props.detail.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

class ShippingOptionDetail extends React.Component {
  render() {
    return(<div>
      <br/>
      <div className="panel-group">
        <div className="panel panel-info">
          <div className="panel-heading">Shipping Option {this.props.index+1}</div>
          <div className="panel-body panel-body-content">
            <div className="row row-odd">
              <div className="col-md-4">Retailer Shipping Option</div>
              <div className="col-md-8">{this.props.detail.description}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Retaildash Shipping Option</div>
              <div className="col-md-8">{this.props.detail.standardizedDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}