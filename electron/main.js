const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Preload script
            contextIsolation: true, // Security
            nodeIntegration: false, // Security
        },
    });

    mainWindow.loadURL('http://localhost:5173'); // Load React app
    //mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

    ipcMain.on("invoke-receiver", (event, args) => {
        console.log("Download button clicked with args:", args);

        const pythonScript = path.join(__dirname, "receiver.py"); // Path to Python script
        

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

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
