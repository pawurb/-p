function promiseMaker() {
  return (function() {
    // detect promise callback resolution type or wrap in a promise like thenable api if it is not a promise
    var wrapVal = function (value) {
      if (value && typeof value.then === "function") {
        return value;
      } else {
        return {
          then: function (callback) {
            return wrapVal(callback(value));
          }
        };
      }
    };

    var _state = 'pending';
    var _pendingSucc = [];
    var _pendingErr = [];
    var _value = null;

    var executeSuccesses = function() {
      for(var i=0; i<_pendingSucc.length; i+=1) {
        _value.then(_pendingSucc[i]);
      }
    };

    var executeErrors = function() {
      for(var i=0; i<_pendingErr.length; i+=1) {
        _value.then(_pendingErr[i]);
      }
    };

    var then = function(cb) {
      var chainedPromise = promiseMaker();
      var callback = function(value) {
        chainedPromise.resolve(cb(value));
      };
      _pendingSucc.push(callback);
      if(_state == 'resolved') {
        executeSuccesses();
      }
      return chainedPromise.promise;
    };
    var fail = function(cb) {
      _pendingErr.push(cb);
      if(_state == 'rejected') {
        executeErrors();
      }
    };
    var resolve = function(value) {
      _value = wrapVal(value);
      if(_state == 'pending') {
        _state = 'resolved';
        executeSuccesses();
      } else {
        throw("Promise can be resolved only once.");
      }
    };
    var reject = function(value) {
      _value = wrapVal(value);
      if(_state == 'pending') {
        _state = 'rejected';
        executeErrors();
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
}

var P = {
  defer: promiseMaker
};

module.exports = P;
