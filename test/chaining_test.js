var expect = require("chai").expect;
var context = describe;
var P = require('../p.js');

describe('basic chainging', function() {
  it('resolves the promise one by one', function(done){
    var deferred_1 = P.defer();
    var deferred_2 = P.defer();

    deferred_1.promise.then(function() {
      deferred_2.resolve();
      return deferred_2.promise;
    })
    .then(function() {
      done();
    });

    deferred_1.resolve();
  });
});

describe('chainging with propagation error', function() {
  it('works like it should', function(done){
    var deferred_1 = P.defer();
    var deferred_2 = P.defer();

    deferred_1.promise.then(function() {
      deferred_2.reject();
      return deferred_2.promise;
    })
    .then(function() {
      throw("This should never happen :D");
    })
    .fail(function() {
      done();
    });

    deferred_1.resolve();
  });
});

describe('continuous chainging', function() {
  it('resolves the chain elements one by one', function(done){
    var deferred_1 = P.defer();

    deferred_1.promise.then(function() {
      return 1;
    })
    .then(function(val) {
      expect(val).to.equal(1);
      return 2;
    })
    .then(function(val) {
      expect(val).to.equal(2);
      done();
    });

    deferred_1.resolve();
  });
});

describe("should not resolve promises automatically", function() {
  it("works when resolving later", function(done) {
    var deferred_1 = P.defer();
    var deferred_2 = P.defer();

    deferred_1.promise.then(function(data) {
      return deferred_2.promise;
    })
    .then(function(data) {
      throw("This should never happen :D");
    });

    deferred_1.resolve();

    setTimeout(function(){
      done();
    }, 50);
  });

  it("works when resolving right away", function(done) {
    var deferred_1 = P.defer();
    var deferred_2 = P.defer();

    deferred_1.resolve();

    deferred_1.promise.then(function(data) {
      return deferred_2.promise;
    })
    .then(function(data) {
      throw("This should never happen :D");
    });

    setTimeout(function(){
      done();
    }, 50);
  });
});

