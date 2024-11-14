//hooks/useFlags.ts

import { useCallback } from 'react';

// Mapping of language names to country codes
const languageToCountryCode: { [key: string]: string } = {
  'English': 'US',
  'Spanish': 'ES',
  'French': 'FR',
  'Mandarin Chinese': 'CN',
  'German': 'DE',
  'Italian': 'IT',
  'Japanese': 'JP',
  'Korean': 'KR',
  'Portuguese': 'PT',
  'Russian': 'RU',
};

// Mapping of country codes to flag URLs
const flagMap: { [key: string]: string } = {
  US: 'https://flagcdn.com/w320/us.png',
  ES: 'https://flagcdn.com/w320/es.png',
  FR: 'https://flagcdn.com/w320/fr.png',
  CN: 'https://flagcdn.com/w320/cn.png',
  DE: 'https://flagcdn.com/w320/de.png',
  IT: 'https://flagcdn.com/w320/it.png',
  JP: 'https://flagcdn.com/w320/jp.png',
  KR: 'https://flagcdn.com/w320/kr.png',
  PT: 'https://flagcdn.com/w320/pt.png',
  RU: 'https://flagcdn.com/w320/ru.png',
};

const DEFAULT_FLAG_URL = 'https://flagcdn.com/w320/us.png'; // Define here

export const useFlags = () => {
  const getFlagUrl = useCallback((language: string | null | undefined): string => {
    const countryCode = language ? languageToCountryCode[language] : null;
    const flagUrl = countryCode ? flagMap[countryCode] : null;

    console.log(`Attempted to fetch flag for language (${language}):`, flagUrl);
    return flagUrl || DEFAULT_FLAG_URL; // Use the constant
  }, []);

  return { getFlagUrl };
};
