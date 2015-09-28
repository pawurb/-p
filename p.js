// detect promise callback resolution type or wrap in a promise like thenable api if it is not a promise
var wrapVal = function (value) {
  if (value && typeof value.then === "function")
    return value;
  return {
    then: function (callback) {
      return wrapVal(callback(value));
    }
  };
};

var Promise = function() {
  var _state = 'pending';
  this._pendingSucc = [];
  this._pendingErr = [];
  var _value = null;

  this.executeSuccesses = function(value) {
    for(var i=0; i<this._pendingSucc.length; i+=1) {
      this._pendingSucc[i](value);
    }
  };

  this.executeError = function(value) {
    for(var i=0; i<this._pendingErr.length; i+=1) {
      this._pendingErr[i](value);
    }
  };

  this.then = function(cb) {
    this._pendingSucc.push(cb);
    if(_state == 'resolved') {
      this.executeSuccesses();
      return this;
    } else {
      return this;
    }
  };
  this.catch = function(cb) {
    this._pendingErr.push(cb)
    if(_state == 'rejected') {
      this.executeError();
      return this;
    } else {
      return this;
    }
  };
  this.resolve = function(value) {
    _value = wrapVal(value);
    _state = 'resolved';
    this.executeSuccesses(value);
  },
  this.reject = function(value) {
    _state = 'rejected';
    this.executeError(value);
  };
  this.promise = this;
};

var P = {
  defer: function() {
    return new Promise();
  }
};

module.exports = P;
