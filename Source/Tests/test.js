var chai = require('chai');
var expect = chai.expect; 
var npm = require('./../npm-registry-api.js');

describe('npm-registry-api', function() {

  it('will generate an error message when the package does not exist.', function() {
    npm.getPackageInfo("not-existing", (result) => {
      expect(result.errorMessage).to.equal("A package with the name 'not-existing' could not be found.");
    });
  });

});

