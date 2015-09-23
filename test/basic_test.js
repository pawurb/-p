var expect = require("chai").expect;
var context = describe
var P = require('../p.js');

describe('basic then case', function() {
  it('works', function(done){
    var deffered = P.defer();

    P.promise.then(function() {
      expect(true).to.eq(true);
      done();
    });

    deffered.resolve();
  });
});

describe('basic catch case', function() {
  it('works', function(done){
    var deffered = P.defer();

    P.promise.catch(function() {
      expect(true).to.eq(true);
      done();
    });

    deffered.reject();
  });
});

describe('chaining then and catch case', function() {
  context('promise resolved', function() {
    it('works', function(done){
      var deffered = P.defer();

      P.promise.then(function() {
        expect(true).to.eq(true);
        done();
      })
      .catch(function() {
        throw('This should not happen.')
      });

      deffered.resolve();
    });
  });

  context('promise rejected', function() {
    it('works', function(done){
      var deffered = P.defer();

      P.promise.then(function() {
        throw('This should not happen.')
      })
      .catch(function() {
        expect(true).to.eq(true);
        done();
      });

      deffered.reject();
    });
  });
});
