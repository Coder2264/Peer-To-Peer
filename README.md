# 📂 P2P File Sharing System

A **peer-to-peer (P2P) file sharing and chat system** with a modern desktop UI, built for **fast, secure, and decentralized communication**.

This system enables users to **share files directly over LAN** without internet dependency, discover peers via a signaling server, and communicate via encrypted chat.

---

## ✨ Features

* 🔐 **User Registration & Login** – Accounts managed via signaling server.
* 📁 **File Sharing** – Upload and view metadata of shared files across peers.
* 🔍 **Search** – Search files by name, description, or type.
* ⚡ **High-Speed Transfers** – Achieves up to **32.7 MBps** over LAN.
* 🌐 **LAN Connectivity** – Works without internet, peer-to-peer via local network.
* 💬 **P2P Chat** – Real-time direct messaging between peers using Socket.IO.
* ⭐ **Ratings & Comments** – Share feedback on files.
* 🔒 **File Encryption** – Ensures secure transfers.
* 🎨 **Modern UI** – Built with **React.js** + **Tailwind CSS** inside an Electron desktop app.

---

## 🏗️ Architecture Overview

The system has a **hybrid architecture**:

* A **Signaling Server (Node.js/Express.js + Socket.IO)** for peer discovery, authentication, and metadata storage.
* A **Desktop Client (Electron + React + Python)** that handles UI, orchestration, and high-speed peer-to-peer file transfers.

### 📊 System Design Diagram

![System Design Diagram](./docs/system-architecture.png)
*(Replace with your diagram path in the repo)*

### Components

* **Signaling Server**

  * Node.js/Express.js backend with Socket.IO
  * Handles registration, authentication, metadata, ratings, and peer discovery

* **Client**

  * **UI Layer (React + Tailwind)** – presentation & chat
  * **Orchestrator (Electron)** – bridges UI and backend
  * **P2P Engine (Python)** – encrypted high-throughput file transfers
  * **Local Storage** – access to filesystem for upload/download

* **P2P Communication**

  * File Transfer: Python ↔ Python direct connections
  * Chat: React ↔ React via Socket.IO (peer-to-peer)
  * Metadata: React/Electron ↔ Signaling Server

---

## ⚙️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Desktop Shell:** Electron
* **File Transfer Engine:** Python (custom service for high-speed P2P transfers)
* **Backend (Signaling Server):** Node.js, Express.js, Socket.IO
* **Database:** (Mention if you’re using MongoDB/Postgres/Redis etc.)

---
## Screenshots

![Speed shown](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167734/Screenshot_28_jm137r.png)
*Peak Speed*

![Chat Page](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167726/Screenshot_21_u6ueoi.png)
*Chat Page*

![File Page](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167726/Screenshot_20_bs8ul2.png)
*File Page*

![Home Page](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167724/Screenshot_16_cg1uui.png)
*Home Page*

![Search](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167721/Screenshot_17_i66c7a.png)
*Search Results*

![Uploading](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167722/Screenshot_14_oecmic.png)
*Uploading Page*

![Upload metadata](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167721/Screenshot_15_pllgiw.png)
*Metadata uploaded*

![Comments shown](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167720/Screenshot_13_kkciny.png)
*Comments*


---

## 🚀 Getting Started

### Prerequisites

* Node.js (>= 18)
* Python (>= 3.10)
* npm / yarn
* (Optional) Redis or DB for signaling server

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/p2p-file-sharing.git
cd p2p-file-sharing

# Install signaling server dependencies
cd signaling-server
npm install

# Install Electron client
cd ../client
npm install

# Install Python service dependencies
cd ../file-transfer-service
pip install -r requirements.txt
```

### Running

```bash
# Start signaling server
cd signaling-server
npm start

# Start Electron client
cd ../client
npm run dev

# Start Python file transfer service
cd ../file-transfer-service
python service.py
```

---

## 🔒 Security

* Encrypted file transfer channels
* Secure peer-to-peer communication over LAN
* Authentication & session management handled via signaling server

---

## 📈 Performance

* Achieves **\~32.7 MBps** transfer speed on a standard mobile hotspot.
* Optimized for **low latency & high throughput** file transfers.

---

Would you like me to also **add a "How It Works" section with sequence diagrams** (login, file transfer, chat), or keep it at a high-level system architecture for now?
