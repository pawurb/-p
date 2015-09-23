console.log("wip");

var Promise = function() {
  this._state = 'initialized';
  this.successCb = null;
  this.errorCb = null;

  this.then = function(cb) {
    this.successCb = cb;
    return this;
  };
  this.catch = function(cb) {
    this.errorCb = cb;
  };
  this.resolve = function(data) {
    this._state = 'resolved';
    this.successCb(data);
  },
  this.reject = function(data) {
    this._state = 'rejected';
    this.errorCb(data);
  }
  this.promise = this;
};

var P = {
  defer: function() {
    return new Promise();
  }
};

module.exports = P;
