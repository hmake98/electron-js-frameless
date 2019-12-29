const {
  app,
  BrowserWindow,
  Tray,
  ipcMain
} = require('electron')
const path = require('path')
let tray, trayWindow, trayBounds;

function createWindow() {
  tray = new Tray('./ice.png');
  trayBounds = tray.getBounds();
  trayWindow = new BrowserWindow({
    width: 128,
    height: 120,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    movable: false,
    minimizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    maximizable: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  trayWindow.loadFile('index.html');  

  // trayWindow.webContents.openDevTools();

  tray.on('right-click', () => {
    trayWindow.setPosition(trayBounds.x - 62, trayBounds.y - 60);
    toggleWindow();
  })

  trayWindow.on('closed', function () {
    trayWindow = null
  })
}

function toggleWindow() {
  trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show();
}

ipcMain.once("quit", (event, args) => {
  app.quit();
})

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (trayWindow === null) createWindow();
})