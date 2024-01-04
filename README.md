# webtask-splunk-logger

# Splunk Logger for Actions
#### using HTTP Event Collector Stream for Bunyan
####  https://github.com/splunk/splunk-bunyan-logger
####  https://github.com/trentm/node-bunyan

#### Version 0.11.0

## Requirements
* NodeJs v18.11.0
* for Bunyan Node.js v4 or later. Splunk HTTP Event Collector Stream for Bunyan is tested with Node.js v10.0 and v14.0.
* Splunk Enterprise 6.3.0 or later, or Splunk Cloud. Splunk HTTP Event Collector Stream for Bunyan is tested with Splunk Enterprise 8.0 and 8.2.0.
* An HTTP Event Collector token from your Splunk Enterprise or Splunk Cloud server.
* [Bunyan](https://www.npmjs.com/package/bunyan) (`npm install --save bunyan`).
* [splunk-bunyan-logger] https://github.com/splunk/splunk-bunyan-logger

## Installation

First, update npm to the latest version by running: `sudo npm install npm -g`.

Then run: `npm install --save webtask-splunk-logger`.

using Yarn: `yarn add webtask-splunk-logger`

## Usage
### example

```javascript
 const createLogger = require("webtask-splunk-logger")
 const SplunkToken = event.secrets.SplunkToken;
 const SplunkUrl = event.secrets.SplunkUrl;
 const SplunkIndex = event.secrets.SplunkIndex;
 const ClientDomain=  event.secrets.ClientDomain

 if (!["SplunkIndex", "SplunkToken", "SplunkUrl"].every(key => Object.keys(event.secrets).includes(key))) {
     throw new Error("Missing splunk config in Action secrets");
 }
 const splunkLogger =  createLogger(SplunkToken, SplunkUrl, SplunkIndex, ClientDomain)

 splunkLogger.logger.info(splunkLogger.payload, {
     // Message can be an object or string (optional)
     message: "message",
     // an error response, optional
     err
 });
```