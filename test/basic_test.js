var expect = require("chai").expect;
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
