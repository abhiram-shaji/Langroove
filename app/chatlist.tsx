import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, TextInput } from "react-native"; // Text from react-native
import { Appbar, List, Badge, Divider } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Chat = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

const ChatListScreen = () => {
  const [search, setSearch] = useState<string>(""); // Make sure the state is a string
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "John Doe",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "Hey, how are you?",
      timestamp: "2:15 PM",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      lastMessage: "Let's learn Spanish?",
      timestamp: "1:05 PM",
      unreadCount: 0,
    },
    {
      id: "3",
      name: "Bob Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      lastMessage: "How do you say hello in french",
      timestamp: "11:30 AM",
      unreadCount: 5,
    },
  ]);

  // Render each chat item
  const renderItem = ({ item }: { item: Chat }) => (
    <>
      <List.Item
        title={() => <Text>{item.name}</Text>} // Wrap title in Text component
        description={() => <Text>{item.lastMessage}</Text>} // Wrap description in Text component
        left={() => (
          <Avatar
            rounded
            size="medium"
            source={{ uri: item.avatarUrl }}
            containerStyle={styles.avatar}
          />
        )}
        right={() => (
          <View style={styles.rightContainer}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {item.unreadCount > 0 && (
              <Badge size={22} style={styles.badge}>
                {item.unreadCount} {/* Directly pass number/string */}
              </Badge>
            )}
          </View>
        )}
        
        onPress={() => console.log(`Chat with ${item.name} pressed`)}
      />
      <Divider />
    </>
  );

  return (
    <SafeAreaProvider>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.Content title="Chats" />
      </Appbar.Header>

      {/* Search Bar */}
      <TextInput
        placeholder="Search by name or message..." // This is allowed directly in TextInput
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={styles.searchInput}
      />

      {/* Chat List */}
      <FlatList
        data={chats.filter(
          (chat) =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaProvider>
  );
};

// Styles for the UI
const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
  searchInput: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    margin: 10,
    borderRadius: 5,
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  badge: {
    marginTop: 4,
    backgroundColor: "#FF3B30",
  },
  chatList: {
    paddingBottom: 100, // Ensures proper padding at the bottom
  },
});

export default ChatListScreen;
