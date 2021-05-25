import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SettingsState } from './settings.model';
import { SettingsStore } from './settings.store';

@Injectable({
    providedIn: 'root'
})
export class SettingsQuery extends Query<SettingsState> {
    settings$ = this.select();
    displayType$ = this.select((state: SettingsState) => state.displayType);

    constructor(protected store: SettingsStore) {
        super(store);
    }
}
