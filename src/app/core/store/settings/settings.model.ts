import { DisplayType } from '@models';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
    isDarkTheme: boolean;
    displayType: DisplayType;
}
