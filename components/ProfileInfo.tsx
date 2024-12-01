import React, { useState, useCallback } from "react";
import { View, ScrollView, Image, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../styles/ProfileScreenStyles";
import { useFlags } from "../hooks/useFlags";
import { useFocusEffect } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ProfileInfoProps {
  userId: string;
}

interface UserInfo {
  name?: string;
  bio?: string;
  nativeLanguages?: string[];
  fluentLanguages?: string[];
  learningLanguages?: string[];
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { getFlagUrl } = useFlags();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from Firebase Firestore
  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data() as UserInfo);
      } else {
        console.error("User not found!");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger data refresh every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, [userId])
  );

  // Helper function to render language rows with flags
  const renderLanguagesWithFlags = (languages: string[] | undefined) => {
    return languages?.length ? (
      <View style={styles.languagesRow}>
        {languages.map((language) => (
          <View key={language} style={styles.languageCard}>
            <Image source={{ uri: getFlagUrl(language) }} style={styles.flagIcon} />
            <Text style={styles.languageText}>{language}</Text>
          </View>
        ))}
      </View>
    ) : (
      <Text style={styles.languagePlaceholder}>Not specified</Text>
    );
  };

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="#f9bc60" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display user name */}
      <Text style={styles.name}>{userInfo?.name || "User"}</Text>

      {/* Display user bio */}
      <Text style={styles.bio}>{userInfo?.bio || "No bio available"}</Text>

      {/* Display user languages with flags */}
      <View style={styles.languagesContainer}>
        <Text style={styles.languagesLabel}>Native</Text>
        {renderLanguagesWithFlags(userInfo?.nativeLanguages)}

        <Text style={styles.languagesLabel}>Fluent</Text>
        {renderLanguagesWithFlags(userInfo?.fluentLanguages)}

        <Text style={styles.languagesLabel}>Learning</Text>
        {renderLanguagesWithFlags(userInfo?.learningLanguages)}
      </View>
    </ScrollView>
  );
};

export default ProfileInfo;
