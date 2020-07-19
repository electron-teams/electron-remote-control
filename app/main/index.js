const { app } = require('electron');
const handleIPC = require('./ipc');
const { create: createMainWin } = require('./windows/main');

let window = null;

app.on('ready', () => {

    createMainWin();
    handleIPC();

})