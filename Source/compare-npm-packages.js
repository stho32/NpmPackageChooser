/**
 * A tool to compare npm packages using their metadata to find the best one. 
 * 
 */

let npm = require("./npm-registry-api.js");
let buildStatusExtractor = require("./build-status-extractor.js");

let outputPackageInformation = (packageName, npmResult, buildStatus, downloads, issueTrackerStats) => {
    delete(npmResult.readmeMd);

    issueTrackerStats = issueTrackerStats || {};

    console.log(`
Package: ${packageName}
  repository url: ${npmResult.repositoryUrl}
  issue tracker url: ${npmResult.issueTrackerUrl}

  latest version: ${npmResult.latestVersion}
  last release date: ${npmResult.releaseDate}
  release count: ${npmResult.releaseCount}
  build status: ${buildStatus || "unknown"}
  downloads of the last 7 days: ${downloads}
  issueTrackerStats : 
    ${issueTrackerStats.openIssues || "unknown"} open issues
    ${issueTrackerStats.closedIssues || "unknown"} closed issues
  licence : ${npmResult.license}
`);
};

let errorHandler = (error) => {
    console.error(error);
};

let getPackageInfo = (packageName) => {
    let packageInfo = undefined;
    let packageDownloads = undefined;
    let buildStatus = undefined;
    let issueTrackerStats = undefined;

    npm.getPackageInfo(packageName)
    .then((packageInfoResult) => {
        packageInfo = packageInfoResult;

        return npm.getPackageDownloads(packageName);
    }, errorHandler)
    .then((packageDownloadsResult) => {
        packageDownloads = packageDownloadsResult;

        let buildStatusResult = "";
        let buildStatusUrl = buildStatusExtractor.getBuildStatusImageUrlFromMarkdown(packageInfo.readmeMd);
        if ( buildStatusUrl !== undefined ) {
            return buildStatusExtractor.getBuildStatusFromSvg(buildStatusUrl);
        } else {
            return Promise.resolve(undefined);
        }
    }, errorHandler)
    .then((buildStatusResult) => {
        buildStatus = buildStatusResult;

        if (packageInfo.issueTrackerUrl !== undefined) {
            return npm.getIssueStats(packageInfo.issueTrackerUrl);
        }

        return Promise.resolve();
    }, errorHandler)
    .then((issueTrackerStatsResults) => {
        issueTrackerStats = issueTrackerStatsResults;

        return Promise.resolve();
    }, errorHandler)
    .then(() => {
        // finally ...
        outputPackageInformation(packageName, packageInfo, buildStatus, packageDownloads, issueTrackerStats);
    }, errorHandler);
}

let packages = process.argv.slice(2);

packages.forEach( packageName => {
    getPackageInfo(packageName);
});

