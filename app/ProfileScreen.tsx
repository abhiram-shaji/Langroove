import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileInfo from "../components/ProfileInfo";
import { styles } from "../styles/ProfileScreenStyles";
import { RootStackParamList } from "../app/App";
import { useProfileActions } from "../hooks/useProfileActions";
import { StackNavigationProp } from "@react-navigation/stack";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const { ownerId } = route.params;
  const { handleAddFriend, handleSendMessage, loading } =
    useProfileActions(ownerId);
  const currentUser = auth.currentUser;

  const [isFriend, setIsFriend] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); // State to trigger reload

  useEffect(() => {
    const checkFriendStatus = async () => {
      if (currentUser) {
        const currentUserDocRef = doc(db, "users", currentUser.uid);
        const currentUserDoc = await getDoc(currentUserDocRef);

        if (currentUserDoc.exists()) {
          const userFriends = currentUserDoc.data().friends || [];
          setIsFriend(userFriends.includes(ownerId));
        }
      }
    };

    checkFriendStatus();
  }, [currentUser, ownerId, reloadKey]); // Add reloadKey to dependencies

  const handleAddFriendAndReload = async () => {
    await handleAddFriend(); // Call the add friend function
    setReloadKey((prevKey) => prevKey + 1); // Trigger reload by updating reloadKey
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileAvatar userId={ownerId} />

      <View style={styles.buttonContainer}>
        {currentUser?.uid === ownerId ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileScreen")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <>
            {!isFriend && (
              <TouchableOpacity
                onPress={handleAddFriendAndReload}
                style={styles.button}
              >
                {loading ? (
                  <ActivityIndicator color="white" /> // Show a loader
                ) : (
                  <Text style={styles.buttonText}>Add Friend</Text>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <ProfileInfo userId={ownerId} />
    </ScrollView>
  );
};

export default ProfileScreen;
