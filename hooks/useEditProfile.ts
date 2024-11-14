//hooks/useEditProfile.ts
import { useState } from 'react';
import { useFlags } from './useFlags';

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

  const [nativeLangMenuVisible, setNativeLangMenuVisible] = useState(false);
  const [fluentLangMenuVisible, setFluentLangMenuVisible] = useState(false);
  const [learningLangMenuVisible, setLearningLangMenuVisible] = useState(false);

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
    setMenuVisible(false); // Close the menu after selection
  };
  
  const handleRemoveLanguage = (
    language: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((lang) => lang !== language));
  };

  const handleSaveProfile = () => {
    console.log({
      name,
      nativeLanguages,
      fluentLanguages,
      learningLanguages,
      bio,
    });
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
    handleSaveProfile,
    languages,
  };
};
