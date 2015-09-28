var expect = require("chai").expect;
var context = describe;
var P = require('../p.js');

describe('promise resolved with data', function() {
  it('passes it on', function(done){
    var deferred = P.defer();

    deferred.promise.then(function(data) {
      expect(data).to.eq('success_data');
      done();
    });

    deferred.resolve('success_data');
  });
});

describe('promise rejected with data', function() {
  var deferred = P.defer();

  it('passes it on', function(done){
    deferred.promise.fail(function(data) {
      expect(data).to.eq('error_data');
      done();
    });

    deferred.reject('error_data');
  });
});
