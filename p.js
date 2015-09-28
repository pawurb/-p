var promiseMaker = function() {
  return (function() {
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

    var _state = 'pending';
    var _pendingSucc = [];
    var _pendingErr = [];
    var _value = null;

    var executeSuccesses = function(value) {
      for(var i=0; i<_pendingSucc.length; i+=1) {
        _pendingSucc[i](value);
      }
    };

    var executeErrors = function(value) {
      for(var i=0; i<_pendingErr.length; i+=1) {
        _pendingErr[i](value);
      }
    };

    var then = function(cb) {
      _pendingSucc.push(cb);
      if(_state == 'resolved') {
        executeSuccesses();
        return promise;
      } else {
        return promise;
      }
    };
    var fail = function(cb) {
      _pendingErr.push(cb)
      if(_state == 'rejected') {
        executeErrors();
        return promise;
      } else {
        return promise;
      }
    };
    var resolve = function(value) {
      _value = wrapVal(value);
      if(_state == 'pending') {
        _state = 'resolved';
        executeSuccesses(value);
      } else {
        throw("Promise can be resolved only once.");
      }
    };
    var reject = function(value) {
      if(_state == 'pending') {
        _state = 'rejected';
        executeErrors(value);
      } else {
        throw("Promise can be rejected only once.");
      }
    };

    var promise = {
      then: then,
      fail: fail,
    };

    var public_api = {
      promise: promise,
      resolve: resolve,
      reject: reject
    };

    return public_api;
  })();
};

var P = {
  defer: promiseMaker
}

module.exports = P;
