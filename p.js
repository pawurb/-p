console.log("wip");

var Promise = function() {
  this._state = 'initialized';
  this.successCb = null;
  this.errorCb = null;

  var that = this;
  this.then = function(cb) {
    that.successCb = cb;
    that._state = 'resolved';
    return that;
  };
  this.catch = function(cb) {
    that.errorCb = cb;
    that._state = 'rejected';
  };
};

var promiseInstance = new Promise();

var P = {
  status: 'wip',
  defer: function() {
    return {
      resolve: function() {
        promiseInstance.successCb();
      },
      reject: function() {
        promiseInstance.errorCb();
      }
    };
  },
  promise: promiseInstance
};

module.exports = P;
