console.log("wip");

var Promise = function() {
  var _state = 'pending';
  var _successCb = null;
  var _errorCb = null;
  var _value = null;

  this.then = function(cb) {
    _successCb = cb;
    if(_state == 'resolved') {
      return _successCb();
    } else {
      return this;
    }
  };
  this.catch = function(cb) {
    _errorCb = cb;
    if(_state == 'rejected') {
      return _errorCb();
    } else {
      return this;
    }
  };
  this.resolve = function(value) {
    _value = value;
    _state = 'resolved';
    if(_successCb) {
      _successCb(value);
    }
  },
  this.reject = function(value) {
    _state = 'rejected';
    if(_errorCb) {
      _errorCb(value);
    }
  };
  this.promise = this;
};

var P = {
  defer: function() {
    return new Promise();
  }
};

module.exports = P;
