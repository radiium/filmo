import { app } from 'electron';
import { isDev } from './main/helpers';
import MainApp from './main/main-app';

const isDevEnv = isDev(app);
process.env.NODE_ENV = isDevEnv ? 'development' : 'production';
console.log('Electron launching mode :', process.env.NODE_ENV);

MainApp.start(app, isDevEnv);
