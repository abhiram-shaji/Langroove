// services/profileService.ts

import { db } from '../firebase'; // Ensure your Firebase config is properly imported
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Fetch profile data from Firestore
export const fetchProfile = async (userId: string) => {
  console.log(`Fetching profile data for user: ${userId}`);
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Profile data found:", data);
      return {
        name: data.name || '',
        nativeLanguages: data.nativeLanguages || [],
        fluentLanguages: data.fluentLanguages || [],
        learningLanguages: data.learningLanguages || [],
        bio: data.bio || '',
        avatar: data.avatar || '',
        email: data.email || '',
      };
    } else {
      console.warn("No profile data found for this user.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};

// Save profile data to Firestore
export const handleSaveProfile = async (userId: string, profileData: {
    name: string;
    nativeLanguages: string[];
    fluentLanguages: string[];
    learningLanguages: string[];
    bio: string;
  }) => {
  console.log("Saving profile data for user:", userId, profileData);
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, profileData, { merge: true }); // Merges data to avoid overwriting other fields
    console.log("Profile data saved successfully.");
  } catch (error) {
    console.error("Error saving profile data:", error);
  }
};
