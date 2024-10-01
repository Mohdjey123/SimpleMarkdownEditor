const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('index.html');
}

// IPC handlers for window controls
ipcMain.on('minimize', () => mainWindow.minimize());
ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});
ipcMain.on('close', () => mainWindow.close());

// IPC handlers for file dialogs
ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'Markdown Files', extensions: ['md'] }],
    });
    if (result.canceled) return;
    const content = fs.readFileSync(result.filePaths[0], 'utf-8');
    return { fileContent: content };
});

ipcMain.handle('dialog:saveFile', async (event, content) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        filters: [{ name: 'Markdown Files', extensions: ['md'] }],
    });
    if (result.canceled) return;
    fs.writeFileSync(result.filePath, content, 'utf-8');
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
