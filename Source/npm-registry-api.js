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
            resultText += resultText + data.toString();
        });

        response.on('end', () => {
            onResultAvailable(JSON.parse(resultText));
        });
    
    }).on('error', (e) => {
      console.error(e);
    });
}

module.exports = {};
module.exports.getPackageInfo = getPackageInfo;