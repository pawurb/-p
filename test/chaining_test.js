// var expect = require("chai").expect;
// var context = describe;
// var P = require('../p.js');

// describe('basic chainging', function() {
//   it('resolves the promise one by one', function(done){
//     var deferred_1 = P.defer();
//     var deferred_2 = P.defer();

//     deferred_1.promise.then(function() {
//       deferred_2.resolve();
//       return deferred_2.promise;
//     })
//     .then(function() {
//       done();
//     });

//     deferred_1.resolve();
//   });

// });

// describe("should not resolve promises automatically", function() {
//   it("works when resolving later", function(done) {
//     var deferred_1 = P.defer();
//     var deferred_2 = P.defer();

//     deferred_1.promise.then(function(data) {
//       return deferred_2.promise;
//     })
//     .then(function(data) {
//       throw("Should not get here.");
//     });

//     deferred_1.resolve();

//     setTimeout(function(){
//       done();
//     }, 50);
//   });

//   it("works when resolving right away", function(done) {
//     var deferred_1 = P.defer();
//     var deferred_2 = P.defer();

//     deferred_1.resolve();

//     deferred_1.promise.then(function(data) {
//       return deferred_2.promise;
//     })
//     .then(function(data) {
//       throw("Should not get here.");
//     });

//     setTimeout(function(){
//       done();
//     }, 50);
//   });
// });

