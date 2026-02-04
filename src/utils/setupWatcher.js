const chokidar = require('chokidar');

const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const setupWatcher = (configPath, wss, onConfigChange) => {
    let watcher = null;
    let isPaused = false;
    
    const handleConfigChange = debounce(async (path) => {
        if (isPaused) return;
        
        console.log(`Config file changed: ${path}`);
        
        try {
            if (onConfigChange) {
                await onConfigChange(path);
            }
            
            wss.broadcastReload();
        } catch (error) {
            console.error('Error handling config change:', error);
        }
    }, 500);
    
    watcher = chokidar.watch(configPath, {
        persistent: true,
        ignoreInitial: true
    });
    
    watcher
        .on('change', handleConfigChange)
        .on('error', (error) => {
            console.error('Watcher error:', error);
        });
    
    console.log(`Watching config file: ${configPath}`);
    
    const pause = () => {
        isPaused = true;
        console.log('Config watcher paused');
    };
    
    const resume = () => {
        isPaused = false;
        console.log('Config watcher resumed');
    };
    
    const close = () => {
        if (watcher) {
            watcher.close();
            watcher = null;
            console.log('Config watcher closed');
        }
    };
    
    return {
        pause,
        resume,
        close
    };
};

module.exports = setupWatcher;
