var Dispatcher = require('flux').Dispatcher;
// var assign = require('object-assign');

// var AppDispatcher = assign(new Dispatcher(), {
//   handleViewAction: function(){
//     var payload = {
//       source: "VIEW_ACTION",
//       action: action
//     };
//     this.dispatch(payload);
//   }
// })
const AppDispatcher = new Dispatcher();

module.exports = AppDispatcher;