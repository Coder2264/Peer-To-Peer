const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    invokeReceiver: (args) => ipcRenderer.send("invoke-receiver", args),
    onReceiverResponse: (callback) => ipcRenderer.on("receiver-response", (event, data) => callback(data)),
    invokeSender: (args) => ipcRenderer.send("invoke-sender", args),
    onSenderResponse: (callback) => ipcRenderer.on("sender-response", (event, data) => callback(data)),
    selectFile: () => ipcRenderer.invoke("dialog:openFile"),
    getFileSize: (filePath) => ipcRenderer.invoke("get-file-size", filePath), 
    getLANIP: () => ipcRenderer.invoke("get-lan-ip"), 
});
