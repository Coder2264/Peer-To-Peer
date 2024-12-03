const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Preload script
            contextIsolation: true, // Security
            nodeIntegration: false, 
        },
    });

    mainWindow.loadURL('http://localhost:5173'); // Load React app

    // Register a global shortcut for DevTools
    globalShortcut.register('CmdOrCtrl+Shift+I', () => {
        if (mainWindow) {
            mainWindow.webContents.toggleDevTools();
        }
    });

    ipcMain.on("invoke-receiver", (event, args) => {
        console.log("Download button clicked with args:", args);

        const pythonScript = path.join(__dirname, "receiver_v3.py"); // Path to Python script

        const getPythonCommand = () => (process.platform === 'win32' ? 'python' : 'python3');
        const pythonProcess = spawn(getPythonCommand(), [pythonScript, ...args]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`Python output: ${data.toString()}`);
            event.reply("receiver-response", data.toString()); // Send result back to renderer
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python error: ${data.toString()}`);
            event.reply("receiver-response", `Error: ${data.toString()}`);
        });

        pythonProcess.on("close", (code) => {
            console.log(`Python process exited with code ${code}`);
        });
    });

    ipcMain.on("invoke-sender", (event, args) => {
        console.log("Sending File with args:", args);

        const pythonScript = path.join(__dirname, "sender_v3.py"); // Path to Python script

        const getPythonCommand = () => (process.platform === 'win32' ? 'python' : 'python3');
        const pythonProcess = spawn(getPythonCommand(), [pythonScript, ...args]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`Python output: ${data.toString()}`);
            event.reply("sender-response", data.toString()); // Send result back to renderer
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python error: ${data.toString()}`);
            event.reply("sender-response", `Error: ${data.toString()}`);
        });

        pythonProcess.on("close", (code) => {
            console.log(`Python process exited with code ${code}`);
        });
    });

    ipcMain.handle("dialog:openFile", async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openFile'],
        });
        if (canceled) return null;
        return filePaths[0];
    });

    ipcMain.handle("get-file-size", async (event, filePath) => {
        try {
            const stats = fs.statSync(filePath);
            return stats.size; // Return file size in bytes
        } catch (error) {
            console.error("Error fetching file size:", error);
            return null;
        }
    });

    const getLANIP = () => {
        const { networkInterfaces } = os;
        const ifacePriorities = ["Wi-Fi", "en0"]; // Add more if needed
        const addresses = [];

        for (const [ifaceName, iface] of Object.entries(networkInterfaces())) {
            if (iface) {
                for (const alias of iface) {
                    if (alias.family === 'IPv4' && !alias.internal) {
                        if (ifacePriorities.includes(ifaceName)) {
                            return alias.address; // Immediate match for prioritized interface
                        }
                        addresses.push(alias.address);
                    }
                }
            }
        }
        return addresses.length > 0 ? addresses[0] : null; // Fallback to the first IP
    };

    ipcMain.handle("get-lan-ip", async () => {
        return getLANIP();
    });


});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
