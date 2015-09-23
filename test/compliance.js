var promisesAplusTests = require("promises-aplus-tests");
var P = require('../p.js');

describe("Promises/A+ Tests", function () {
  require("promises-aplus-tests").mocha(P);
});
