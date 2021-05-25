import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { DisplayType } from '@models';
import { SettingsState } from './settings.model';

export const initialState: SettingsState = {
    isDarkTheme: true,
    displayType: DisplayType.GRID,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsState> {
    constructor() {
        super(initialState);
    }
}
