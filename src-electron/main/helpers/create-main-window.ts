import { BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

export const createMainWindow = () => {
    // const appUrl = url.format({
    //     pathname: path.resolve(__dirname, '..', '..', 'renderer', 'index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    // });

    const appUrl = path.resolve(__dirname, '..', '..', 'renderer', 'index.html');

    const mainScreen = screen.getPrimaryDisplay();
    const mainWindowParams = {
        width: mainScreen.size.width,
        height: mainScreen.size.height,
        minWidth: 500,
        minHeight: 300,
        darkTheme: true,
        backgroundColor: '#3b8d99',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        }
    };

    let mainWindow = new BrowserWindow(mainWindowParams);
    mainWindow.loadFile(appUrl);
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => mainWindow.show());

    return mainWindow;
}
