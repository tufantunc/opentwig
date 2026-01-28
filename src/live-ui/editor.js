const API_BASE = '/api';

let currentConfig = null;
let autoSaveTimeout = null;
let isAutoSaveEnabled = true;

const loadConfig = async () => {
    try {
        const response = await fetch(`${API_BASE}/config`);
        const config = await response.json();
        currentConfig = config;
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        showNotification('Failed to load configuration', 'error');
        return null;
    }
};

const saveConfig = async (config) => {
    try {
        const response = await fetch(`${API_BASE}/config`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });
        
        const result = await response.json();
        
        if (result.success) {
            currentConfig = result.config;
            updateLastSavedTime();
            showNotification('Configuration saved', 'success');
            return true;
        } else {
            throw new Error(result.error || 'Save failed');
        }
    } catch (error) {
        console.error('Error saving config:', error);
        showNotification(`Failed to save: ${error.message}`, 'error');
        return false;
    }
};

const autoSave = (config) => {
    if (!isAutoSaveEnabled) return;
    
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveConfig(config);
    }, 500);
};

const validateField = (field, value) => {
    const errors = [];
    
    switch (field) {
        case 'url':
            if (!value || value.trim() === '') {
                errors.push('URL is required');
            } else if (!value.startsWith('http://') && !value.startsWith('https://')) {
                errors.push('URL must start with http:// or https://');
            }
            break;
        case 'name':
            if (!value || value.trim() === '') {
                errors.push('Name is required');
            }
            break;
        case 'links':
            if (value && value.length > 0) {
                value.forEach((link, index) => {
                    if (!link.url || link.url.trim() === '') {
                        errors.push(`Link ${index + 1}: URL is required`);
                    }
                    if (!link.title || link.title.trim() === '') {
                        errors.push(`Link ${index + 1}: Title is required`);
                    }
                });
            }
            break;
    }
    
    return errors;
};

const updateLastSavedTime = () => {
    const lastSavedEl = document.getElementById('lastSaved');
    const now = new Date();
    lastSavedEl.textContent = now.toLocaleTimeString();
};

const showNotification = (message, type = 'info') => {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
};

const exportConfig = () => {
    if (!currentConfig) {
        showNotification('No configuration to export', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(currentConfig, null, 4);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    showNotification('Configuration exported', 'success');
};

const handleSave = () => {
    if (currentConfig) {
        saveConfig(currentConfig);
    }
};

const toggleAutoSave = () => {
    const checkbox = document.getElementById('autoSave');
    isAutoSaveEnabled = checkbox.checked;
    
    if (isAutoSaveEnabled) {
        showNotification('Auto-save enabled', 'info');
    } else {
        showNotification('Auto-save disabled', 'info');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    const exportBtn = document.getElementById('exportBtn');
    const autoSaveCheckbox = document.getElementById('autoSave');
    
    saveBtn.addEventListener('click', handleSave);
    exportBtn.addEventListener('click', exportConfig);
    autoSaveCheckbox.addEventListener('change', toggleAutoSave);
    
    loadConfig().then(config => {
        if (config) {
            renderConfigForm(config);
        }
    });
});

window.configEditor = {
    loadConfig,
    saveConfig,
    autoSave,
    currentConfig: () => currentConfig,
    updateConfig: (newConfig) => {
        currentConfig = newConfig;
    }
};
