import { BrowserWindow, shell, screen } from 'electron';
import * as path from 'path';

export const createMainWindowDev = () => {
    const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
    const appUrl = 'http://localhost:4200';
    const mainScreen = screen.getPrimaryDisplay();
    const mainWindowParams = {
        x: 0,
        width: mainScreen.size.width - 400,
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
    mainWindow.loadURL(appUrl);
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.webContents.openDevTools({ mode: 'detach' });

    // require('devtron').install();
    require('electron-reload')(__dirname, {
        electron: electronPath,
        hardResetMethod: 'exit'
    });
    require('electron-context-menu')({
        showServices: true,
        prepend: (defaultActions: any, params: any, browserWindow: any) => {
            return [
                {
                    label: 'Rainbow',
                    visible: params.mediaType === 'image'
                },
                {
                    label: 'Search Google for “{selection}”',
                    // Only show it when right-clicking text

                    visible: params && params.selectionText.trim().length > 0,
                    click: () => {
                        shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
                    }
                }
            ];
        }
    });

    const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REDUX_DEVTOOLS)
        .then((name: any) => console.log(`Added Extension:  ${name}`))
        .catch((err: any) => console.log('An error occurred: ', err));

    return mainWindow;
}
