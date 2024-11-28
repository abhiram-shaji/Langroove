// SetTranslateModal.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/SetTranslateModalStyles";

interface SetTranslateModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedLanguage: string) => void;
}

// Map language names to their country codes for flag fetching
const languageToCountryMap: Record<string, string> = {
  English: "US",
  Spanish: "ES",
  French: "FR",
  "Mandarin Chinese": "CN",
  German: "DE",
  Italian: "IT",
  Japanese: "JP",
  Korean: "KR",
  Portuguese: "PT",
  Russian: "RU",
};

const languages = Object.keys(languageToCountryMap);

const SetTranslateModal: React.FC<SetTranslateModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [flags, setFlags] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagsMap: { [key: string]: string | null } = {};
      for (const language of languages) {
        const countryCode = languageToCountryMap[language];
        const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
        flagsMap[language] = flagUrl;
        console.log(`Set flag for ${language}: ${flagUrl}`);
      }
      setFlags(flagsMap);
      console.log("All flags set:", flagsMap); // Log the entire flags map after setting
    };

    fetchFlags();
  }, []);

  const handleLanguageSelect = (language: string) => {
    onSave(language);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Select Language</Text>
        <Text style={styles.modalHint}>
          Double tap incoming message to translate
        </Text>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={languages}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleLanguageSelect(item)}
                style={styles.languageItem}
              >
                {flags[item] && (
                  <Image
                    source={{ uri: flags[item] }}
                    style={styles.flagIcon}
                  />
                )}
                <Text style={styles.languageText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default SetTranslateModal;
