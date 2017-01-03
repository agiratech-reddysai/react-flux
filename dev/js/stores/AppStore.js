var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _retailers = [];
let _retailer = {};

function setRetailers(retailers) {
  _retailers = retailers;
}

function setRetailer(retailer) {
  _retailer = retailer;
}

class RetailerStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getRetailers() {
    return _retailers;
  }

  getRetailer() {
    return _retailer;
  }

}

const AppStore = new RetailerStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AppStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case AppConstants.RECIEVE_RETAILERS:
      setRetailers(action.retailers);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      AppStore.emitChange();
      break

    case AppConstants.RECIEVE_RETAILER:
      setRetailer(action.retailer);
      AppStore.emitChange();
      break

    case AppConstants.RECIEVE_RETAILER_ERROR:
      // alert(action.message);
      AppStore.emitChange();
      break

    case AppConstants.RECIEVE_RETAILERS_ERROR:
      // alert(action.message);
      AppStore.emitChange();
      break

    default:
  }

});

module.exports = AppStore;