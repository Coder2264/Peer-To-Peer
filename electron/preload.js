const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    invokeReceiver: (args) => ipcRenderer.send("invoke-receiver", args),
    onReceiverResponse: (callback) => ipcRenderer.on("receiver-response", (event, data) => callback(data)),
});
