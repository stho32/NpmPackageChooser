let npmRegistryUrl = "https://registry.npmjs.org/";
let https = require("https");

function getPackageInfo(packageName, onResultAvailable) {
    
    https.get(npmRegistryUrl + packageName, response => {
        if ( response.statusCode == 404 ) {
            onResultAvailable({
                    errorMessage: "A package with the name '" + packageName + "' could not be found."
                });
            return;
        }

        let resultText = "";
    
        response.on('data', data => {
            resultText += data.toString();
        });

        response.on('end', () => {
            let possibleResult = {};
            try
            {
                //console.log(resultText);
                possibleResult = JSON.parse(resultText);
            }
            catch(e) {
                console.error("Error parsing json from npm! " + e.message)
            }

            let result = {}
            result.latestVersion = possibleResult["dist-tags"].latest;
            result.releaseDate   = possibleResult["time"][result.latestVersion];
            result.releaseCount  = Object.keys(possibleResult["versions"]).length;

            onResultAvailable(result);
        });
    
    }).on('error', (e) => {
      console.error(e);
    });
}

module.exports = {};
module.exports.getPackageInfo = getPackageInfo;