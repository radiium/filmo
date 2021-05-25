import { App, BrowserWindow, Menu } from 'electron';
import { createMainWindowDev, createMainWindow } from './helpers';
import {
    fileMenuTemplate,
    editMenuTemplate,
    devMenuTemplate
} from './menu';

require('@electron/remote/main').initialize();

export default class MainApp {

    private static app: App;
    private static mainWindow: BrowserWindow;
    private static isDev: boolean = false;

    private constructor() {}

    public static start(app: App, isDev: boolean) {
        this.app = app;
        this.isDev = isDev;
        this.initAppListener();
    }

    // Init Electron Events
    private static initAppListener() {
        // On app ready
        this.app.on('ready', () => {
            this.createMainWindow();
        });

        // On window close
        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit();
            }
        });

        // On activate window (Recreate window when icon is clicked)
        this.app.on('activate', () => {
            if (this.mainWindow === null) {
                this.createMainWindow();
            }
        });

        // Clear cache and cookie session before quit
        this.app.on('before-quit', () => {
            if (!this.isDev) {
                this.mainWindow.webContents.session.clearAuthCache().then(() => {
                    console.log('clearAuthCache');
                });
                this.mainWindow.webContents.session.clearCache().then(() => {
                    console.log('clearCache');
                });
                this.mainWindow.webContents.session.clearStorageData().then(() => {
                    console.log('clearStorageData');
                });
            }
        });

        process.on('uncaughtException', (err: any) => {
            console.error('Uncaught Exception', err);
            const msg: any = {
                /*type : "error",
                title : "Uncaught Exception",
                buttons:["ok", "close"],*/
                width : 400
            };

            switch (typeof err) {
                case 'object':
                    msg.title = 'Uncaught Exception: ' + err.code;
                    msg.message = err.message;
                    break;
                case 'string':
                    msg.message = err;
                    break;
            }
            msg.detail = 'Please check the console log for more details.';
            this.mainWindow.webContents.send('onElectronError', msg);
        });
    }

    private static createMainWindow() {
        this.mainWindow = this.isDev
            ? createMainWindowDev()
            : createMainWindow();

        const menus: Array<any> = [fileMenuTemplate, editMenuTemplate, devMenuTemplate];
        Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
    }
}
