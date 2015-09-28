var expect = require("chai").expect;
var context = describe;
var P = require('../p.js');

describe('promise resolved multiple times', function() {
  it('throws an error', function(){
    var deferred = P.defer();
    deferred.resolve();

    var oneTimeTooMany = function() {
      deferred.resolve();
    };
    expect(oneTimeTooMany).to.throw();
  });
});

describe('promise rejected multiple times', function() {
  it('throws an error', function(){
    var deferred = P.defer();
    deferred.reject();

    var oneTimeTooMany = function() {
      deferred.reject();
    };
    expect(oneTimeTooMany).to.throw();
  });
});
