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

var promise_instance = new Promise();

var P = {
  status: 'wip',
  defer: function() {
    return {
      resolve: function(data) {
        promise_instance.successCb(data);
      },
      reject: function(data) {
        promise_instance.errorCb(data);
      }
    };
  },
  promise: promise_instance
};

module.exports = P;
