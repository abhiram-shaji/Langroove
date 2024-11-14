import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
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
  }, [currentUser, ownerId]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileAvatar userId={ownerId} />

      <View style={styles.buttonContainer}>
        {currentUser?.uid === ownerId ? (
          <Button
            mode="contained"
            onPress={() => navigation.navigate("EditProfileScreen")}
            style={styles.button}
          >
            Edit Profile
          </Button>
        ) : (
          <>
            {!isFriend && (
              <Button
                mode="contained"
                onPress={handleAddFriend}
                style={styles.button}
                loading={loading}
              >
                Add Friend
              </Button>
            )}
            <Button
              mode="contained"
              onPress={handleSendMessage}
              style={styles.button}
            >
              Message
            </Button>
          </>
        )}
      </View>

      <ProfileInfo userId={ownerId} />
    </ScrollView>
  );
};

export default ProfileScreen;
