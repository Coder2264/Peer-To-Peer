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

![System Design Diagram](https://res.cloudinary.com/dcij8s42h/image/upload/v1757491017/Screenshot_2025-09-10_at_1.26.18_PM_yabopa.png)

### Components

* **Signaling Server**

  * Node.js/Express.js backend
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
* **Backend (Signaling Server):** Node.js, Express.js
* **Database:** MongoDB
---
## 🔒 Security

* Encrypted file transfer channels
* Secure peer-to-peer communication over LAN
* Authentication & session management handled via signaling server

---

## 📈 Performance

* Achieves **\~261.6 Mbps** transfer speed on a standard mobile hotspot.
* Optimized for **low latency & high throughput** file transfers.

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



