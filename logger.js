const fs = require("fs");

const logFile = './logs/application.log'

const logEvent = (event) => {
    const timeStamp = new Date().toISOString();
    const logMessage = `${timeStamp} - ${event}\n`;
    fs.appendFile(logFile,logMessage, (err) => {
        if(err) {
            console.error('Error writing to log file:',err)
        }
    });
}
module.exports = {logEvent}
