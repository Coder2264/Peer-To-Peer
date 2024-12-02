import React, { useState } from 'react';

const DownloadButton = ({ serverIP, fileSize }) => {
  const [response, setResponse] = useState('');

  const handleDownload = () => {
    // Trigger Python script via Electron
    window.electronAPI.invokeReceiver([serverIP, fileSize.toString()]);

    // Listen for response (only once)
    const responseListener = (event, data) => {
      setResponse(data);
      // Optionally remove the listener after receiving the response
      window.electronAPI.onReceiverResponse(null);
    };

    window.electronAPI.onReceiverResponse(responseListener);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default DownloadButton;
