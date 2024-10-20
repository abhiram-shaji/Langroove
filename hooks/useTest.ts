import { useCallback } from "react";
import { db, auth } from "../firebase"; // Adjust the import paths as necessary
import { doc, getDoc, collection, query, onSnapshot, where } from "firebase/firestore";

export const useTest = () => {
  const currentUser = auth.currentUser;

  // Fetch user data (username) for a given senderId
  const fetchUserName = async (senderId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", senderId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user:", userData.name); // Log fetched user name
        return userData?.name || "Unknown User";
      } else {
        console.log("No such user for senderId:", senderId);
      }
    } catch (error) {
      console.error("Error fetching user data for:", senderId, error);
    }
    return "Unknown User";
  };

  const handlePress = useCallback(() => {
    if (!currentUser) {
      console.log("No logged-in user");
      return;
    }

    console.log("Fetching chat history for user:", currentUser.uid);

    // Construct the chat ID for the current user and their recipients
    const chatId = [currentUser.uid, "ayYFbh8Frccb80et49oTYFNgXj63"].sort().join("_"); // Replace with appropriate recipient ID if dynamic
    const messagesRef = collection(db, "chats", chatId, "messages");

    const q = query(messagesRef, where("sender", "!=", currentUser.uid)); // Get all messages not sent by the current user

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        console.log("No messages found");
      }

      const senderIds = new Set<string>();

      snapshot.forEach((doc) => {
        const messageData = doc.data();
        const senderId = messageData.sender;
        if (senderId && senderId !== currentUser.uid) {
          senderIds.add(senderId);
        }
      });

      if (senderIds.size === 0) {
        console.log("No other users found in chat");
      }

      // Fetch and log usernames
      senderIds.forEach(async (senderId) => {
        const userName = await fetchUserName(senderId);
        console.log("User in chat:", userName);
      });
    });

    return () => unsubscribe(); // Clean up the snapshot listener when necessary
  }, [currentUser]);

  return {
    handlePress,
  };
};
