var expect = require("chai").expect;
var context = describe;
var P = require('../p.js');

describe('basic then case', function() {
  it('works', function(done){
    var deferred = P.defer();

    deferred.promise.then(function() {
      expect(true).to.eq(true);
      done();
    });

    deferred.resolve();
  });
});

describe('basic catch case', function() {
  it('works', function(done){
    var deferred = P.defer();

    deferred.promise.catch(function() {
      expect(true).to.eq(true);
      done();
    });

    deferred.reject();
  });
});

describe('chaining then and catch case', function() {
  context('promise resolved', function() {
    it('works', function(done){
      var deferred = P.defer();

      deferred.promise.then(function() {
        expect(true).to.eq(true);
        done();
      })
      .catch(function() {
        throw('This should not happen.');
      });

      deferred.resolve();
    });
  });

  context('promise rejected', function() {
    it('works', function(done){
      var deferred = P.defer();

      deferred.promise.then(function() {
        throw('This should not happen.');
      })
      .catch(function() {
        expect(true).to.eq(true);
        done();
      });

      deferred.reject();
    });
  });
});

describe("promise resolved before registering then", function() {
  it("still works", function(done) {
    var deferred = P.defer();
    deferred.resolve();

    deferred.promise.then(function() {
      expect(true).to.eq(true);
      done();
    });
  });
});

describe("promise rejected before registering then", function() {
  it("still works", function(done) {
    var deferred = P.defer();
    deferred.reject();

    deferred.promise.catch(function() {
      expect(true).to.eq(true);
      done();
    });
  });
});
