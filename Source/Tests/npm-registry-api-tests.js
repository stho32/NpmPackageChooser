var chai = require('chai');
var expect = chai.expect; 
var npm = require('./../npm-registry-api.js');

describe('npm-registry-api', function() {

  it('will generate an error message when the package does not exist.', function() {
    npm.getPackageInfo("not-existing", (result) => {
      expect(result.errorMessage).to.equal("A package with the name 'not-existing' could not be found.");
    });
  });

  it('downloads stats of a npm package', function() {
    npm.getPackageInfo("bcrypt", result => {
      expect(result.latestVersion, "Latest version").to.equal("1.0.3");
      expect(result.releaseDate, "Release date and time").to.equal("2017-08-24T03:47:34.385Z");
      expect(result.releaseCount, "Release count").to.equal(36);
      // Get downloads:
      // https://api.npmjs.org/downloads/range/2018-01-01:2018-02-01/bcrypt
      console.dir(result);
    });
  });

  it('moment()')

});

