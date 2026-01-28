const previewFrame = document.getElementById('previewFrame');
const refreshBtn = document.getElementById('refreshBtn');

let ws = null;

const initWebSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
        console.log('WebSocket connected');
        updateStatus('connected');
    };
    
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
            case 'reload':
                console.log('Received reload signal');
                reloadPreview();
                break;
            case 'config-update':
                console.log('Config updated:', message.config);
                break;
            case 'theme-change':
                console.log('Theme changed to:', message.theme);
                reloadPreview();
                break;
        }
    };
    
    ws.onclose = () => {
        console.log('WebSocket disconnected');
        updateStatus('disconnected');
        setTimeout(initWebSocket, 3000);
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        updateStatus('disconnected');
    };
};

const updateStatus = (status) => {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = statusIndicator.querySelector('.status-dot');
    const statusText = statusIndicator.querySelector('.status-text');
    
    statusDot.classList.remove('connected', 'disconnected');
    statusDot.classList.add(status);
    
    if (status === 'connected') {
        statusText.textContent = 'Connected';
    } else {
        statusText.textContent = 'Disconnected';
    }
};

const reloadPreview = () => {
    const currentUrl = previewFrame.src;
    const separator = currentUrl.includes('?') ? '&' : '?';
    previewFrame.src = `${currentUrl}${separator}t=${Date.now()}`;
};

const refreshBtnHandler = () => {
    reloadPreview();
    showNotification('Preview refreshed', 'info');
};

refreshBtn.addEventListener('click', refreshBtnHandler);

document.addEventListener('DOMContentLoaded', () => {
    initWebSocket();
});
