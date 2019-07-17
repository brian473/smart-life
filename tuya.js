const TuyAPI = require('tuyapi');

const device = new TuyAPI({
    id: '33800305cc50e3233ea5',
    ip: '192.168.50.39',
    gwID: '33800305cc50e32391ec',
    key: '8e2c51d8a310c7eb',
    productKey: '2EzYjcFvB3W5mXuK',
    version: 3.1});

// Find device on network
device.find().then(() => {
    // Connect to device
    device.connect();
});

// Add event listeners
device.on('connected', () => {
    console.log('Connected to device!');
});

device.on('disconnected', () => {
    console.log('Disconnected from device.');
});

device.on('error', error => {
    console.log('Error!', error);
});

device.on('data', data => {
    console.log('Data from device:', data);
});



// Disconnect after 10 seconds
setTimeout(() => { device.disconnect(); }, 10000);