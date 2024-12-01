// src/services/settingsService.js

// Settings keys
const SETTINGS_KEY = 'userSettings';

const settingsService = {
    // Load user settings from local storage
    loadSettings: () => {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        return savedSettings ? JSON.parse(savedSettings) : { theme: 'light', notifications: true };
    },

    // Save settings to local storage
    saveSettings: (settings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    },

    // Update specific setting by merging with existing settings
    updateSetting: (key, value) => {
        const currentSettings = settingsService.loadSettings();
        const updatedSettings = { ...currentSettings, [key]: value };
        settingsService.saveSettings(updatedSettings);
        return updatedSettings;
    }
};

export default settingsService;
