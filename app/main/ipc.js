const { ipcMain } = require('electron');
const { send: sendMainWindow } = require('./windows/main');
const { create: createControlWindow } = require('./windows/control');

module.exports = () => {

    ipcMain.handle('login', async () => {
        // [111111,999999]
        // parseInt(Math.random()*(max+1-min)+min)
        let code = parseInt(Math.random() * (999999 - 111111 + 1) + 111111);
        return code
    })

    ipcMain.handle('control', async (e, remoteCode) => {
        console.log("remote", remoteCode);

        // 跟服务器交互
        sendMainWindow('control-state-change', remoteCode, 1);
        createControlWindow();
    });

} 