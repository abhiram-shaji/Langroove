# Langroove - Language Learning App

Langroove is a dynamic platform for language learners, offering tools to chat, manage friends, and practice real-time communication in different languages. This document includes **User Documentation** for end users and **Developer Documentation** for contributors.

[Link To Play Store](https://play.google.com/store/apps/details?id=com.langroove.app) (Only allowed testers for now)
[Download APK](https://drive.google.com/file/d/1DZuIKCl-TvJ0xspKEkwdUm76dI5Vl1XP/view?usp=sharing)

---

## User Documentation

### Features

1. **Authentication**
   - Create an account or log in using your email.
   - Reset forgotten passwords easily.

2. **User Profiles**
   - Customize your profile with a name and avatar.
   - Manage your friend list and connect with other users.

3. **Chat Functionality**
   - One-on-one real-time messaging.
   - View chat history and send messages in your preferred language.

4. **Language Learning Tools**
   - Translate messages in real-time to practice and understand new languages.
   - Set individual translation languages for yourself and chat participants.

---

### Getting Started

1. **Download the App**
   - Get Langroove from the [Google Play Store](https://play.google.com/store/apps/details?id=com.langroove.app) or [Download APK](https://drive.google.com/file/d/1DZuIKCl-TvJ0xspKEkwdUm76dI5Vl1XP/view?usp=sharing).

2. **Sign Up**
   - Open the app and create a new account by providing your email and a password.

3. **Start Chatting**
   - Add friends to your list and start real-time messaging.
   - Use the translation feature to practice new languages.

4. **Manage Your Profile**
   - Update your name, avatar, and language preferences anytime.

---

### Support and Feedback
If you encounter any issues or have feedback, contact support via the app or email me at write4abhiram@gmail.com

---

## Developer Documentation

### Overview

Langroove is built with React Native and Firebase, incorporating custom hooks for functionality and a structured project setup for ease of collaboration. Below are the key components, setup instructions, and implementation details.

---

### Features Overview

1. **Authentication Management**
   - `useLogin`: Handles user login with Firebase Authentication.
   - `useSignUp`: Manages new user registration and data storage in Firestore.
   - `useLogout`: Signs out the user and clears app state.

2. **Data Management**
   - `useFriendList`: Fetches and manages the friend list from Firestore.
   - `useChat`: Handles chat messages, real-time updates, and chat metadata.

3. **State Management**
   - `useState` and `useEffect` are extensively used to manage local states and side effects.

4. **Firestore Integration**
   - Implements CRUD operations (`addDoc`, `setDoc`, `getDoc`) for chat messages and user data.

---

### Project Structure

- **`src/hooks`**: Custom React hooks for managing app logic.
- **`src/components`**: Reusable UI components (e.g., chat bubbles, profile cards).
- **`src/screens`**: Main app screens (e.g., LoginScreen, ChatScreen).
- **`src/firebaseConfig.js`**: Firebase configuration and initialization.
- **`App.js`**: The app’s entry point.

---

### Prerequisites

1. **Node.js**: Version 12 or higher.
2. **Expo**: For React Native project management.
3. **Firebase**: A Firebase project with Authentication and Firestore set up.

---

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/langroove.git
   cd langroove
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Firebase**
   - Create a Firebase project.
   - Enable Firebase Authentication and Firestore.
   - Add your Firebase configuration to `src/firebaseConfig.js`.

4. **Start Development Server**
   ```bash
   npx expo start
   ```

5. **Run on Emulator or Device**
   - Use the Expo Go app or a configured emulator (Android/iOS).

---

### Key Logic and Wiki Links

#### App Logic
- [App.tsx](https://github.com/abhiram-shaji/Langroove/wiki/App.tsx-(The-entry))
- [Project Summary](https://github.com/abhiram-shaji/Langroove/wiki/Project-Summary)

#### Chat Logic
- [Chat Logic](https://github.com/abhiram-shaji/Langroove/wiki/Chat-Logic)
- [List of Friends Logic](https://github.com/abhiram-shaji/Langroove/wiki/List-of-Friends-Logic)

#### Feed Logic
- [Feed Logic](https://github.com/abhiram-shaji/Langroove/wiki/Feed-Logic)
- [useAddTopic Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useAddTopic-Hook-logic)

#### Authentication
- [Login Logic](https://github.com/abhiram-shaji/Langroove/wiki/Login-Logic)
- [Sign-Up Logic](https://github.com/abhiram-shaji/Langroove/wiki/Sign-Up-Logic)
- [Forgot Password Logic](https://github.com/abhiram-shaji/Langroove/wiki/Forgot-Password-Logic)
- [Email Verification Logic](https://github.com/abhiram-shaji/Langroove/wiki/Email-Verification-Logic)
- [useFirebaseAuthErrors Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useFirebaseAuthErrors-Hook-Logic)

#### Profile
- [Fetch User Profile](https://github.com/abhiram-shaji/Langroove/wiki/Fetch-user-profile)
- [useEditProfile Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useEditProfile-Hook-Logic)
- [useProfileActions Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useProfileActions-Hook-Logic)

#### Navigation
- [Navbar Logic](https://github.com/abhiram-shaji/Langroove/wiki/Navbar-Logic)
- [useHeader Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useHeader-Hook-Logic)

#### Database and Data Fetching
- [Database Structure](https://github.com/abhiram-shaji/Langroove/wiki/Databse-Structure)
- [User Data Fetching](https://github.com/abhiram-shaji/Langroove/wiki/Fetching-User-Data-from-Firebase-Firestore)

#### Caching and Optimization
- [Caching Feature](https://github.com/abhiram-shaji/Langroove/wiki/Caching-Feature)

#### Translation
- [Libre Translate Syntax](https://github.com/abhiram-shaji/Langroove/wiki/Libre-Translate-Syntax)
- [Supported Translation Languages on Langroove](https://github.com/abhiram-shaji/Langroove/wiki/Supported-Translation-Languages-on-Langroove)

#### Development and Deployment
- [Build an APK from Your Expo App](https://github.com/abhiram-shaji/Langroove/wiki/Build-an-APK-from-Your-Expo-App)
- [How to Make a Production Build in Expo for Android App Bundle (AAB)](https://github.com/abhiram-shaji/Langroove/wiki/How-to-Make-a-Production-Build-in-Expo-for-Android-App-Bundle-(AAB))
- [Deploying Langroove App on Google Play Store](https://github.com/abhiram-shaji/Langroove/wiki/Deploying-Langroove-App-on-Google-Play-Store)
- [Further Google Developer Account & Deployment Guideline](https://github.com/abhiram-shaji/Langroove/wiki/Further-Google-Developer-Account-&-Deployment-Guideline)

#### Hooks
- [useSearch Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useSearch-Hook-Logic)
- [useFlags Hook Logic](https://github.com/abhiram-shaji/Langroove/wiki/useFlags-Hook-Logic)

#### Miscellaneous
- [TypeScript for a Better Developer Experience](https://github.com/abhiram-shaji/Langroove/wiki/Practices-adopted)
- [Practices Adopted](https://github.com/abhiram-shaji/Langroove/wiki/Practices-adopted)
- [Revert to an Old Commit](https://github.com/abhiram-shaji/Langroove/wiki/Revert-to-an-old-commit)
- [Testing and Verification: Internal Testing Guide for Langroove](https://github.com/abhiram-shaji/Langroove/wiki/Testing-and-Verification:-Internal-Testing-Guide-for-Langroove)

---

### Future Enhancements

1. **Post-MVP Features**
   - Language games for interactive learning.
   - Voice messaging for better language practice.
   - Push notifications for user engagement.

2. **Optimizations**
   - Improve data fetching and caching.
   - Enhance app responsiveness and UI transitions.

---

### Contributor Guide

- Fork the repository and create a branch for your feature or bug fix.
- Use clean, modular code and follow the existing code style.
- Submit a pull request with detailed comments on your changes.

---

Happy coding!
