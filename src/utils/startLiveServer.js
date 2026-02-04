const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { default: open } = require('open');
const multer = require('multer');
const createWSServer = require('./websocketServer');
const loadConfig = require('./loadConfig');
const buildPage = require('./buildPage');
const saveFiles = require('./saveFiles');
const setupWatcher = require('./setupWatcher');
const CONSTANTS = require('../constants');
const { applyDefaults, SAMPLE_CONFIG } = require('./configDefaults');

const startLiveServer = async (customPort) => {
    const app = express();
    const server = http.createServer(app);
    const wss = createWSServer(server);
    
    const PORT = customPort || process.env.PORT || CONSTANTS.LIVE_MODE.PORT;
    const HOST = process.env.HOST || CONSTANTS.LIVE_MODE.DEFAULT_HOST;
    
    const cwd = process.cwd();
    const packageDir = path.join(path.dirname(require.main.filename || process.argv[1]), '..');
    const configPath = path.join(cwd, CONSTANTS.CONFIG_FILE);
    
    app.use(express.json());
    
    app.use('/live-ui', express.static(path.join(packageDir, 'src', 'live-ui')));
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(packageDir, 'src', 'live-ui', 'index.html'));
    });
    
    app.use(express.static(path.join(cwd, 'dist')));
    
    app.get('/api/config', (req, res) => {
        try {
            if (!currentConfig) {
                if (fs.existsSync(configPath)) {
                    currentConfig = loadConfig();
                } else {
                    currentConfig = applyDefaults(SAMPLE_CONFIG);
                    fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 4));
                }
            }
            res.json(currentConfig);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.post('/api/config', async (req, res) => {
        try {
            const newConfig = req.body;
            currentConfig = applyDefaults(newConfig);
            
            fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 4));
            
            const { html, css, ogImage, qrImage } = await buildPage(currentConfig);
            saveFiles(html, css, currentConfig.avatar, ogImage, qrImage);
            
            res.json({ success: true, config: currentConfig });
            
            // Broadcast reload after files are saved
            wss.broadcastReload();
        } catch (error) {
            console.error('Error building page:', error);
            res.status(500).json({ error: error.message });
        }
    });
    
    const upload = multer({
        dest: cwd,
        limits: { fileSize: 5 * 1024 * 1024 }
    }).single('avatar');
    
    app.post('/api/avatar', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.error('Avatar upload error:', err);
                return res.status(500).json({ success: false, error: err.message });
            }
            
            if (!req.file) {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
            
            const avatarPath = path.basename(req.file.path);
            
            res.json({ success: true, path: avatarPath });
        });
    });
    
    app.get('/api/themes', (req, res) => {
        try {
            const themeDir = path.join(packageDir, 'theme');
            const themes = fs.readdirSync(themeDir).filter(file => {
                const themePath = path.join(themeDir, file);
                return fs.statSync(themePath).isDirectory();
            });
            res.json(themes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.get('/api/validate', (req, res) => {
        try {
            const config = req.query.config ? JSON.parse(req.query.config) : null;
            
            if (!config) {
                return res.json({ valid: false, errors: ['Config is required'] });
            }
            
            const errors = [];
            const warnings = [];
            
            if (!config.url) {
                errors.push('URL is required');
            }
            
            if (!config.name) {
                errors.push('Name is required');
            }
            
            if (config.url && !config.url.startsWith('http')) {
                warnings.push('URL should start with http:// or https://');
            }
            
            if (config.links && config.links.length === 0) {
                warnings.push('No links configured');
            }
            
            res.json({ 
                valid: errors.length === 0, 
                errors, 
                warnings 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.get('/api/status', (req, res) => {
        res.json({
            connected: true,
            clientCount: wss.getClientCount(),
            configPath,
            configExists: fs.existsSync(configPath)
        });
    });
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(packageDir, 'src', 'live-ui', 'index.html'));
    });
    
    server.listen(PORT, HOST, async () => {
        console.log(`${CONSTANTS.MESSAGES.SUCCESS_PREFIX} Live server running at http://${HOST}:${PORT}`);
        console.log(`   Config: ${configPath}`);
        
        if (fs.existsSync(configPath)) {
            currentConfig = loadConfig();
            await buildPage(currentConfig);
            console.log(`   Page built from existing config`);
        } else {
            currentConfig = applyDefaults(SAMPLE_CONFIG);
            fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 4));
            await buildPage(currentConfig);
            console.log(`   Created sample config`);
        }
        
        console.log(`\n📖 Press Ctrl+C to stop the server`);
        
        let browserOpened = false;
        try {
            if (typeof open !== 'undefined' && open) {
                await open(`http://${HOST}:${PORT}`);
                browserOpened = true;
            } else {
                console.log(`   ⚠️  Browser auto-open not available`);
                console.log(`   Please visit: http://${HOST}:${PORT}`);
            }
        } catch (error) {
            console.log(`   ⚠️  Could not open browser automatically`);
            console.log(`   Please visit: http://${HOST}:${PORT}`);
            
            if (error.code === 'ENOENT') {
                console.log(`   No browser command found. Please open the URL manually.`);
            } else if (error.code === 'EACCES') {
                console.log(`   Permission denied to open browser. Please open the URL manually.`);
            } else {
                console.log(`   Error: ${error.message}`);
            }
        }
        
        if (browserOpened) {
            console.log(`   ✅ Browser opened successfully`);
        }
    });
    
    const watcher = setupWatcher(configPath, wss, async (changedPath) => {
        try {
            // Read config directly from file to avoid require cache issues
            const configContent = fs.readFileSync(configPath, 'utf8');
            const fileConfig = JSON.parse(configContent);
            currentConfig = applyDefaults(fileConfig);
            await buildPage(currentConfig);
            console.log('Page rebuilt from config change');
        } catch (error) {
            console.error('Error rebuilding page:', error);
        }
    });
    
    server.on('close', () => {
        console.log('\nServer stopped');
        watcher.close();
    });
};

module.exports = startLiveServer;
