# SnusStop

SnusStop is a full-stack mobile app designed to help users reduce or quit their use of **snus** (a smokeless tobacco product popular in Scandinavia). Users can log their daily snus consumption, follow a structured reduction program (linear or exponential), and track their progress through motivational statistics like streaks and money saved.

---

## Features

- Google Sign-In for easy and secure authentication
- Personalized reduction plans (linear or exponential)
- Real-time snus logging interface
- Progress tracking (streak, money saved, usage reduction)
- Calendar and stats views for historical insights (planned)
- Burger menu for navigation and settings

---

## Tech Stack

**Frontend:**

- React Native + Expo
- React Native Elements
- Google Auth via `expo-auth-session`

**Backend:**

- Node.js + Express
- MySQL database
- RESTful API

**Utilities:**

- Python script for dev automation (`run.py`)
- Ngrok tunneling
- Selenium (for automating Ngrok setup)

---

## Installation & Setup

### Prerequisites

- Node.js and npm
- Python 3
- MySQL
- Ngrok
- Expo Go app (for testing on a mobile device)

### Clone the Repository

```bash
git clone https://github.com/Williamjacobsen/SnusStop.git
cd SnusStop
```

### Backend Setup

```bash
cd backend
npm install
# Add .env with your MySQL password
echo "PASSWORD=your_mysql_password" > .env
```

Ensure your MySQL database **snusstop** exists and has the required tables (**accounts**, **datapoints**).

### Frontend Setup
```bash
cd ../frontend
npm install
```

### Run the App

**Recommended:**

```bash
python run.py
```

This will:

- **Start a public Ngrok tunnel** for the backend (port 5000)
- **Update `frontend/env.json`** with the Ngrok URL for API requests
- **Launch the backend server** (`npm start` in `/backend`)
- **Start the Expo development server** for the mobile app (`npm start` in `/frontend`)

Once both servers are running:

- Scan the QR code with the **Expo Go app** on your mobile device, or run the app in an emulator
- Log in using your Google account
- Begin logging your daily snus usage and track your progress!
