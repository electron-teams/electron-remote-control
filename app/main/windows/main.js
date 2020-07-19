const { app, BrowserWindow, webContents } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let window = null;

const create = () => {
    window = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (isDev) {
        window.loadURL('http://localhost:3000');
    } else {
        window.loadFile(path.resolve(__dirname, '../renderer/pages/control/index.html'));
    }
}

const send = (channel, ...args) => {
    window.webContents.send(channel, ...args);
}

module.exports = {
    create,
    send
};