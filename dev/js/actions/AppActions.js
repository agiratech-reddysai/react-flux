var AppDispatcher = require('../dispatcher/AppDispatcher')
var AppConstants = require('../constants/AppConstants')
var AppAPI = require('../utils/AppAPI.js');

var AppActions = {
  receiveRetailers: () => {
    AppAPI.getRetailers('http://localhost:8000/v1/retailers')
      .then(retailers => {
        AppDispatcher.dispatch({
          actionType: AppConstants.RECIEVE_RETAILERS,
          retailers: retailers
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AppConstants.RECIEVE_RETAILERS_ERROR,
          message: message
        });
      });
  },

  getRetailer: (id) => {
    AppAPI.getRetailer('http://localhost:8000/v1/retailer/' + id)
      .then(retailer => {
        AppDispatcher.dispatch({
          actionType: AppConstants.RECIEVE_RETAILER,
          retailer: retailer
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AppConstants.RECIEVE_RETAILER_ERROR,
          message: message
        });
      });
  }
}

module.exports = AppActions;