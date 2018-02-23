/**
 * A tool to compare npm packages using their metadata to find the best one. 
 * 
 */

let npm = require("./npm-registry-api.js");
let buildStatus = require("./build-status-extractor.js");

let outputPackageInformation = (packageName, npmResult, buildStatus, downloads) => {
    delete(npmResult.readmeMd);
    console.log(`
Package: ${packageName}
  latest version: ${npmResult.latestVersion}
  last release date: ${npmResult.releaseDate}
  release count: ${npmResult.releaseCount}
  build status: ${buildStatus || "unknown"}
  downloads of the last 7 days: ${downloads}
`);
};

let getPackageInfo = (packageName) => {
    npm.getPackageInfo(packageName, (npmResult) => {

        npm.getPackageDownloads(packageName, downloads => {
            let buildStatusResult = "";
            let buildStatusUrl = buildStatus.getBuildStatusImageUrlFromMarkdown(npmResult.readmeMd);
            if ( buildStatusUrl !== undefined ) {
                buildStatus.getBuildStatusFromSvg(buildStatusUrl, buildStatus => {
                    outputPackageInformation(packageName, npmResult, buildStatus, downloads);
                });
                return;
            }
    
            outputPackageInformation(packageName, npmResult, undefined, downloads);
        });
    });
}

let packages = process.argv.slice(2);

packages.forEach( package => {
    getPackageInfo(package);
});
