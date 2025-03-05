# P2P File Transfer

Welcome to the P2P File Transfer project! This is a decentralized file-sharing system that enables users to transfer files over a local network (LAN) without requiring an internet connection.

## Table of Contents
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Screenshots

![File Sharing Page](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167734/Screenshot_28_jm137r.png)
*File Sharing Page*

![Search Page](https://res.cloudinary.com/da7nnqjzz/image/upload/v1741167726/Screenshot_21_u6ueoi.png)
*Search Page*

## Demo Video

*Coming soon...*

## Features
- **User Registration**: Users can create an account and log in.
- **File Sharing**: Users can upload and view shared files from all users.
- **Search Functionality**: Search by file name, description, or file type.
- **High-Speed File Transfer**: Achieves up to **32 MBps** on a mobile hotspot.
- **LAN Connectivity**: No internet required; works over the same local network.
- **User Interface**: Built with **React.js** and **Tailwind CSS** for a seamless experience.
- **Rating & Comments**: Users can rate and comment on shared files.
- **P2P Chat**: Enables direct messaging between online users.
- **File Encryption**: Secure file transfers with encryption.

## Technologies Used

![Node.js](https://nodejs.org/static/images/logo.svg)
- **Node.js** (Backend)

![Express.js](https://expressjs.com/images/express-facebook-share.png)
- **Express.js** (Server)

![React.js](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)
- **React.js** (Frontend)

![Tailwind CSS](https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg)
- **Tailwind CSS** (Styling)

![WebSockets](https://upload.wikimedia.org/wikipedia/commons/8/86/WebSocket_logo.svg)
- **WebSockets** (Real-time P2P communication)

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/p2p-file-transfer.git
    cd p2p-file-transfer
    ```
2. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```
3. **Install frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```
4. **Set up environment variables**
    Create a `.env` file in the `backend` directory and add your configuration details:
    ```env
    PORT=3000
    MONGODB_URI=
    FRONTEND_URL=http://localhost:5173
    ```
5. **Start the backend server**
    ```bash
    cd backend
    npm start
    ```
6. **Start the frontend server**
    ```bash
    cd ../frontend
    npm start
    ```

## Usage
Once installed, open `http://localhost:5173` in your web browser.

- **Register/Login**: Create an account or log in.
- **Upload Files**: Share files with others.
- **Search Files**: Find files based on name, description, or type.
- **Download Files**: Transfer files securely.
- **Chat**: Communicate with other online users.

## Project Structure

```plaintext
p2p-file-transfer/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utilities/
│   ├── .env
│   ├── app.js
│   ├── database.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── Axios.js
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Follow these steps to contribute:
1. Fork the project
2. Create a new branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Md Kamran - akhtarkamran2004@gmail.com

Project Link: [https://github.com/Coder2264/Peer-To-Peer](https://github.com/Coder2264/Peer-To-Peer)

## Acknowledgements

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com)
