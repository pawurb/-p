var expect = require("chai").expect;
var context = describe;
var P = require('../p.js');

describe('basic then case', function() {
  it('works', function(done){
    var deferred = P.defer();

    deferred.promise.then(function() {
      done();
    });

    deferred.resolve();
  });
});

describe('basic fail case', function() {
  it('works', function(done){
    var deferred = P.defer();

    deferred.promise.fail(function() {
      done();
    });

    deferred.reject();
  });
});

describe('chaining then and fail case', function() {
  context('promise resolved', function() {
    it('works', function(done){
      var deferred = P.defer();

      deferred.promise.then(function() {
        done();
      })
      .fail(function() {
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
      .fail(function() {
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
      done();
    });
  });
});

describe("promise rejected before registering then", function() {
  it("still works", function(done) {
    var deferred = P.defer();
    deferred.reject();

    deferred.promise.fail(function() {
      done();
    });
  });
});

describe("multiple success callbacks set", function() {
  it("resolves them all", function(done) {
    var resolved_1 = false;
    var resolved_2 = false;

    var deferred = P.defer();
    deferred.promise.then(function() {
      resolved_1 = true;
    });

    deferred.promise.then(function() {
      resolved_2 = true;
    });

    deferred.promise.then(function() {
      expect(resolved_1).to.equal(true);
      expect(resolved_2).to.equal(true);
      done();
    });

    deferred.resolve();
  });
});

describe("multiple error callbacks set", function() {
  it("resolves them all", function(done) {
    var rejected_1 = false;
    var rejected_2 = false;

    var deferred = P.defer();
    deferred.promise.fail(function() {
      rejected_1 = true;
    });

    deferred.promise.fail(function() {
      rejected_2 = true;
    });

    deferred.promise.fail(function() {
      expect(rejected_1).to.equal(true);
      expect(rejected_2).to.equal(true);
      done();
    });

    deferred.reject();
  });
});
