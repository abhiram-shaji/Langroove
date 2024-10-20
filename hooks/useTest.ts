import { useCallback } from "react";
import { db, auth } from "../firebase"; // Adjust the import paths as necessary
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";


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

    // Query chat IDs that involve the current user (either as the first or second user in the ID)
    const userChatQuery = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUser.uid)
    );

    const unsubscribe = onSnapshot(userChatQuery, (snapshot) => {
      if (snapshot.empty) {
        console.log("No chats found for user");
        return;
      }

      snapshot.forEach((chatDoc) => {
        const chatId = chatDoc.id; // The unique chat ID
        const messagesRef = collection(db, "chats", chatId, "messages");

        const unsubscribeMessages = onSnapshot(messagesRef, (messagesSnapshot) => {
          if (messagesSnapshot.empty) {
            console.log(`No messages found for chat: ${chatId}`);
            return;
          }

          const senderIds = new Set<string>();

          messagesSnapshot.forEach((messageDoc) => {
            const messageData = messageDoc.data();
            const senderId = messageData.sender;
            if (senderId !== currentUser.uid) {
              senderIds.add(senderId);  // Add the sender if it's not the current user
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

        return () => unsubscribeMessages(); // Clean up the snapshot listener for messages when necessary
      });
    });

    return () => unsubscribe(); // Clean up the snapshot listener for chats when necessary
  }, [currentUser]);

  return {
    handlePress,
  };
};
