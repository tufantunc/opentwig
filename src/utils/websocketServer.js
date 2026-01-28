const WebSocket = require('ws');

const createWSServer = (server) => {
    const wss = new WebSocket.Server({ server, path: '/ws' });
    
    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
        
        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
        });
        
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
    
    const broadcast = (message) => {
        const data = JSON.stringify(message);
        
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };
    
    const broadcastReload = () => {
        broadcast({ type: 'reload' });
    };
    
    const broadcastConfigUpdate = (config) => {
        broadcast({ type: 'config-update', config });
    };
    
    const broadcastThemeChange = (theme) => {
        broadcast({ type: 'theme-change', theme });
    };
    
    const getClientCount = () => {
        return wss.clients.size;
    };
    
    return {
        broadcast,
        broadcastReload,
        broadcastConfigUpdate,
        broadcastThemeChange,
        getClientCount
    };
};

module.exports = createWSServer;
