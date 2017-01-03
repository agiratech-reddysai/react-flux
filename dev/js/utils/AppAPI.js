import request from 'superagent/lib/client';

var AppAPI = {
  // We want to get a list of all the contacts
  // from the API. This list contains reduced info
  // and will be be used in the sidebar
  getRetailers: function(url){
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response.body.retailers);
        })
    });
  },

  getRetailer: function(url){
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response.body.retailer);
        })
    });
  }
}

module.exports = AppAPI;