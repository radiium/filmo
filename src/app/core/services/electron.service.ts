import Electron from 'electron';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import parser from 'fast-xml-parser';
import ptn from 'parse-torrent-name';

declare let window: any;

export class ElectronService {
    private electron: typeof Electron;
    private remote: Electron.Remote;

    // Node modules
    public fs: typeof fs;
    public path: typeof path;
    public glob: typeof glob;
    public parser: typeof parser;

    // Node electron
    public desktopCapturer: Electron.DesktopCapturer;
    public ipcRenderer: Electron.IpcRenderer;
    public webFrame: Electron.WebFrame;
    public clipboard: Electron.Clipboard;
    public crashReporter: Electron.CrashReporter;
    public nativeImage: typeof Electron.nativeImage;
    public shell: Electron.Shell;

    // From Electron remote
    public dialog: Electron.Dialog;
    public screen: Electron.Screen;
    public process: Electron.Remote;

    constructor() {
        if (this.isElectronApp) {
            this.electron = window.require('electron');
            this.remote = window.require('@electron/remote');

            // Node modules
            this.fs = window.require('fs');
            this.path = window.require('path');
            this.glob = window.require('glob');
            this.parser = window.require('fast-xml-parser');

            // From electron
            this.desktopCapturer = this.electron.desktopCapturer;
            this.ipcRenderer = this.electron.ipcRenderer;
            this.webFrame = this.electron.webFrame;
            this.clipboard = this.electron.clipboard;
            this.crashReporter = this.electron.crashReporter;
            this.nativeImage = this.electron.nativeImage;
            this.shell = this.electron.shell;

            // From Electron remote
            this.dialog = this.remote.dialog;
            this.screen = this.remote.screen;
            this.process = this.remote.getGlobal('process');
        }
    }


    public get isElectronApp(): boolean {
        return !!window.navigator.userAgent.match(/Electron/);
    }
    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
      }

    public get isMacOS(): boolean {
        return this.isElectronApp && process.platform === 'darwin';
    }

    public get isWindows(): boolean {
        return this.isElectronApp && process.platform === 'win32';
    }

    public get isLinux(): boolean {
        return this.isElectronApp && process.platform === 'linux';
    }

    public get isX86(): boolean {
        return this.isElectronApp && process.arch === 'ia32';
    }

    public get isX64(): boolean {
        return this.isElectronApp && process.arch === 'x64';
    }

    public get isArm(): boolean {
        return this.isElectronApp && process.arch === 'arm';
    }
}
