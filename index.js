
function createLogger(SplunkToken, SplunkUrl, SplunkIndex, ClientDomain) {
    let  splunkLogger = {};
    let payload = {
        host: `https://${ClientDomain}`, //event.secrets.ClientDomain
        source: "auth0_webtask",
        sourcetype: "httpevent",
        index: SplunkIndex //event.secrets.SplunkIndex
    };
    try {
        const splunkBunyan = require("splunk-bunyan-logger");

        const bunyan = require("bunyan");

        console.log("Testing Actions splunk logging...");
        // if (!["SplunkIndex", "SplunkToken", "SplunkUrl"].every(key => Object.keys(event.secrets).includes(key))) {
        //     throw new Error("Missing splunk config in Action secrets");
        // }
        const config = {
            token: SplunkToken,//event.secrets.SplunkToken,
            url: SplunkUrl, //event.secrets.SplunkUrl,
            port: 443
        };

        console.log("Creating bunyan logger");
        const splunkStream = splunkBunyan.createStream(config);
        splunkStream.on("error", function (err, context) {
            // Handle errors here
            console.log("Error", err, "Context", context);
        });
        splunkLogger = bunyan.createLogger({
            name: "iam splunk logger",
            streams: [splunkStream]
        });
    } catch (err) {
        console.log({
            message: "Failed to create bunyan logger",
            err
        });
        splunkLogger = {
            info: console.log
        };
        return {logger: splunkLogger, payload: payload}
    }
    return {logger: splunkLogger, payload: payload}

};

module.exports = createLogger;
