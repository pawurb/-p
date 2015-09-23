console.log("wip");

var Promise = function() {
  this._state = 'dupa';
  this.callback = null;
  var that = this;
  this.then = function(cb) {
    that.callback = cb;
  };
};

var promiseInstance = new Promise();

var P = {
  status: 'wip',
  defer: function() {
    return {
      resolve: function() {
        promiseInstance.callback();
      }
    };
  },
  promise: promiseInstance
};

module.exports = P;
