// hooks/useEditProfile.ts

import { useState, useEffect } from 'react';
import { useFlags } from './useFlags';
import { handleSaveProfile, fetchProfile } from '../services/profileService';
import { getAuth } from 'firebase/auth'; // Assuming you're using Firebase Auth

const languages = [
  "English",
  "Spanish",
  "French",
  "Mandarin Chinese",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
];

export const useEditProfile = () => {
  const [name, setName] = useState('');
  const [nativeLanguages, setNativeLanguages] = useState<string[]>([]);
  const [fluentLanguages, setFluentLanguages] = useState<string[]>([]);
  const [learningLanguages, setLearningLanguages] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [bioCharacterLimit] = useState(200);

  const { getFlagUrl } = useFlags();
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Get userId from Firebase Auth

  const [nativeLangMenuVisible, setNativeLangMenuVisible] = useState(false);
  const [fluentLangMenuVisible, setFluentLangMenuVisible] = useState(false);
  const [learningLangMenuVisible, setLearningLangMenuVisible] = useState(false);

  useEffect(() => {
    if (!userId) return; // Ensure userId exists before fetching
    const loadProfileData = async () => {
      const profileData = await fetchProfile(userId);
      if (profileData) {
        setName(profileData.name || '');
        setNativeLanguages(profileData.nativeLanguages || []);
        setFluentLanguages(profileData.fluentLanguages || []);
        setLearningLanguages(profileData.learningLanguages || []);
        setBio(profileData.bio || '');
      }
    };
    loadProfileData();
  }, [userId]);

  const getAvailableLanguages = (currentSelection: string[]) => {
    return languages.filter(
      (language) =>
        !nativeLanguages.includes(language) &&
        !fluentLanguages.includes(language) &&
        !learningLanguages.includes(language) &&
        !currentSelection.includes(language)
    );
  };

  const handleLanguageSelection = (
    selectedLanguage: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => [...prev, selectedLanguage]);
    setMenuVisible(false);
  };

  const handleRemoveLanguage = (
    language: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((lang) => lang !== language));
  };

  const saveProfile = () => {
    if (!userId) return;
    const profileData = {
      name,
      nativeLanguages,
      fluentLanguages,
      learningLanguages,
      bio,
    };
    handleSaveProfile(userId, profileData);
  };

  return {
    name,
    setName,
    nativeLanguages,
    setNativeLanguages,
    fluentLanguages,
    setFluentLanguages,
    learningLanguages,
    setLearningLanguages,
    bio,
    setBio,
    bioCharacterLimit,
    getFlagUrl,
    nativeLangMenuVisible,
    setNativeLangMenuVisible,
    fluentLangMenuVisible,
    setFluentLangMenuVisible,
    learningLangMenuVisible,
    setLearningLangMenuVisible,
    getAvailableLanguages,
    handleLanguageSelection,
    handleRemoveLanguage,
    saveProfile,
  };
};
