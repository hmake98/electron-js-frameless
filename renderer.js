const ipc = require('electron').ipcRenderer;
const userOS = navigator.appVersion.indexOf('Mac') !== -1 ? 'mac' : 'win';

document.getElementById('tray_option_window').classList.add(userOS);

document.getElementById('quit').addEventListener('click', () => {
    console.log("Hey")
    ipc.send('quit', true);
});

