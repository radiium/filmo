import { Component, Injector, OnInit } from '@angular/core';
import { SettingsState } from '@core/store/settings/settings.model';
import { SettingsQuery } from '@core/store/settings/settings.query';
import { SettingsService } from '@core/store/settings/settings.service';
import { DisplayType } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-ui-settings',
    templateUrl: './ui-settings.component.html',
    styleUrls: ['./ui-settings.component.scss'],
})
export class UiSettingsComponent extends ComponentAbstract implements OnInit {

    public settings: SettingsState;

    constructor(
        public injector: Injector,
        private settingsQuery: SettingsQuery,
        private settingsService: SettingsService
    ) {
        super(injector);
    }

    ngOnInit() {
        // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        // console.log('prefersDark', prefersDark);
        // this.isDarkTheme = prefersDark.matches;
        this.subs.settings = this.settingsQuery.settings$.subscribe({
            next: (data: SettingsState) => {
                this.settings = data;
            }
        });
    }

    onThemeChange(event: any): void {
        const isDarkTheme = event.detail.checked;
        document.body.classList.toggle('dark', isDarkTheme);
        this.settingsService.setIsDarkTheme(isDarkTheme);
    }

    onDisplayTypeChange(value: DisplayType): void {
        this.settingsService.setDisplayType(value);
    }
}
