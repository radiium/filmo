import { Injectable } from '@angular/core';
import { SettingsStore } from './settings.store';
import { DisplayType } from '@models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(
        private store: SettingsStore
    ) { }

    setIsDarkTheme(value: boolean): void {
        this.store.update({ isDarkTheme: value });
    }

    setDisplayType(value: DisplayType): void {
        this.store.update({ displayType: value });
    }
}
