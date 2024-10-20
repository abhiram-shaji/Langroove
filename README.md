# Langroove - Language Learning App

Welcome to the Langroove project! This app is designed to provide an interactive platform for language learners, allowing users to chat, manage friends, and practice real-time communication in different languages. This README will guide you through the current implementation of the project, covering the core features, functions, and how to get started with running the app locally.

---

## Features Overview

### 1. **Authentication Management**
- **Login and Sign-Up**:
  - **`useLogin`**: Handles user authentication via Firebase. It manages the login state, and upon successful login, it navigates users to appropriate screens.
  - **`useSignUp`**: Manages new user registration, including form validation, creating a user account in Firebase Authentication, and storing user details in Firestore.
  
- **Logout**:
  - **`useLogout`**: Signs out the user and redirects them to the login screen.

### 2. **User Profile and Friends Management**
- **Friend List**:
  - **`useFriendList`**: Fetches the user's friend list from Firestore. It includes search and filtering functionality to easily locate friends by name or other attributes.

### 3. **Chat Functionality**
- **Individual Chat Management**:
  - **`useChat`**: Manages one-on-one chat conversations. It supports:
    - Sending messages and handling real-time updates.
    - Fetching message history from Firestore.
    - Updating chat metadata (e.g., last message, participants).

### 4. **Data Management with Firestore**
- **Real-Time Updates**:
  - **`onSnapshot`**: Listens for real-time changes in Firestore collections, ensuring that chat lists, friends, and messages are always up to date.

- **CRUD Operations**:
  - **`addDoc`**: Adds new documents to Firestore, primarily used for sending messages.
  - **`setDoc`**: Creates or updates documents, used for chat metadata (e.g., last message, participants).
  - **`getDoc`**: Retrieves specific documents, used for fetching user profiles and friend details.

### 5. **State Management**
- **`useState`**: Manages local component states, such as messages, loading indicators, search terms, errors, etc., ensuring the app is responsive to user inputs and data changes.

### 6. **Effects Management**
- **`useEffect`**: Used throughout the app to handle side effects like fetching data on component mount, updating lists when data changes, or cleaning up resources when components unmount.

---

## Logic

Here is an overview of the core logic components, with detailed explanations available in the wiki:

- [App.tsx (The entry)](https://github.com/abhiram-shaji/Langroove/wiki/App.tsx-(The-entry))
- [Chat Logic](https://github.com/abhiram-shaji/Langroove/wiki/Chat-Logic)
- [Feed Logic](https://github.com/abhiram-shaji/Langroove/wiki/Feed-Logic)
- [Fetching User Data from Firebase Firestore](https://github.com/abhiram-shaji/Langroove/wiki/Fetching-User-Data-from-Firebase-Firestore)
- [List of Chats Logic](https://github.com/abhiram-shaji/Langroove/wiki/List-of-Friends-Logic)
- [List of Friends Logic](https://github.com/abhiram-shaji/Langroove/wiki/List-of-Friends-Logic)
- [Login Logic](https://github.com/abhiram-shaji/Langroove/wiki/Login-Logic)
- [Logout Logic](https://github.com/abhiram-shaji/Langroove/wiki/Logout-Logic)
- [Sign-Up Logic](https://github.com/abhiram-shaji/Langroove/wiki/Sign-Up-Logic)
- [Database Structure](https://github.com/abhiram-shaji/Langroove/wiki/Databse-Structure)

---


## Prerequisites

Before running the project, ensure you have the following installed on your machine:

1. **Node.js** (v12 or higher)
2. **Expo CLI** (for managing the React Native project)
3. **Firebase Project**: Set up Firebase Authentication and Firestore (use Firebase configuration in the app).

---

## Getting Started

Follow the steps below to set up and run the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/langroove.git
cd langroove
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

### 4. Configure Firebase
- Navigate to the Firebase Console and create a new project.
- Set up Firebase Authentication and Firestore for the app.
- Copy the Firebase configuration object (API keys, projectId, etc.) and add it to your app in the appropriate place (e.g., `firebaseConfig.js`).

### 5. Start the Expo Development Server
```bash
expo start
```

- This command will open the Expo developer tools in your browser.
- You can now scan the QR code with the Expo Go app on your mobile device or run the app on an emulator.

### 6. Running on Android/iOS Emulator
To run the app on an Android or iOS emulator:

- For Android: Ensure you have Android Studio installed with an emulator configured.
- For iOS: Use Xcode and set up an iOS simulator.

Once configured, select the target platform from the Expo developer tools.

---

## Project Structure

- **`src/hooks`**: Contains custom React hooks for managing authentication, chat, friends, and other data operations.
- **`src/components`**: Contains reusable UI components for the app (e.g., chat bubbles, profile cards).
- **`src/screens`**: Contains the main screens (e.g., login, signup, chat, profile).
- **`src/firebaseConfig.js`**: The configuration file for Firebase services (authentication, Firestore, etc.).
- **`App.js`**: The entry point of the application.

---

## Future Features (Post-MVP)

- **Language Games**: Introducing fun learning activities like "2 Truths and 1 Lie" and word matching games.
- **Voice Messaging**: Allowing users to send voice messages for language practice.
- **Push Notifications**: Enabling real-time notifications for new messages and friend requests.

---

Thank you for being part of Langroove! Happy coding and language learning!