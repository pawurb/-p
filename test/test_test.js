var expect = require("chai").expect;
var P = require('../p.js');

describe('test', function() {
  it('tests', function(){
     expect(true).to.eq(true);
  });
});

describe('test import', function() {
  it('imports', function(){
     expect(P.status).to.eq('wip');
  });
});
