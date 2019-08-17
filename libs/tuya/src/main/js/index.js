/**
 * Example script using cloudtuya to connect, get states an change them
 */


const fs = require('fs'),
    CloudTuya = require('cloudtuya');

const name = 'cloudtuya';

console.log('booting %s', name);
// Load local files
let apiKeys = {};
let deviceData = {};
try{
    apiKeys = require('../../../keys.json') || {};
    deviceData = require('../../../devices.json') || {};
} catch(err) {
    console.log('keys.json or devices.json are missing.');
    console.log(JSON.stringify(apiKeys));
}

/**
 * Save Data Such a Devices to file
 * @param {Object} data to save
 * @param {String} [file="./devices.json"] to save to
 */
function saveDataToFile(data, file = './devices.json') {
    console.log(`Data ${JSON.stringify(data)}`);
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if(err) {
            return console.log(err);
        }
        console.log(`The file ${file} was saved!`);
        return(file);
    });
}


(async () => {
    // Load from keys.json
    const api = new CloudTuya({
        userName: apiKeys.userName,
        password: apiKeys.password,
        bizType: apiKeys.bizType,
        countryCode: apiKeys.countryCode,
        region: apiKeys.region,
    });

    const testId = '70007862840d8eb8db43';

    // Connect to cloud api and get access token.
    const tokens = await api.login();
    console.log(`Token ${JSON.stringify(tokens)}`);

    // Get all devices registered on the Tuya app
    let devices = await api.find();
    console.log(`devices ${JSON.stringify(devices)}`);

    saveDataToFile(devices);

    // Get state of a single device
    const deviceStates = await api.state({
        devId: testId,
    });
    const state = deviceStates[testId];
    console.log(`testId ${testId}  has value ${state}`);
    console.log(`devices ${JSON.stringify(deviceStates)}`);

    // Turn device with testId off.
    devices = await api.setState({
        devId: testId,
        setState: "On",
        cmd: "turnOnOff"
    });
    console.log(`devices ${JSON.stringify(devices)}`);
})();
