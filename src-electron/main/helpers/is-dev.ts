import { App } from 'electron';

export const isDev = (app: App) => {
    let isDevEnv = false;
    const args = process.argv.slice(1);
    const electronEnv = process.env.ELECTRON_ENV || '';
    const nodeEnv = process.env.NODE_ENV || '';

    isDevEnv = electronEnv.indexOf('dev') !== -1 ||
        nodeEnv.indexOf('dev') !== -1 ||
        args.some(val => val === '--dev') ||
        app.isPackaged !== true;

    return isDevEnv;
};
