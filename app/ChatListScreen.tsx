// /screens/ChatListScreen.tsx

import React from 'react';
import { FlatList, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatItem from '../components/ChatItem';
import { useChatList } from '../hooks/useChatList';
import { styles } from '../styles/ChatListStyles';

const ChatListScreen: React.FC = () => {
  const { search, setSearch, filteredChats } = useChatList();

  return (
    <SafeAreaProvider>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.Content title="Chats" />
      </Appbar.Header>

      {/* Search Input */}
      <TextInput
        placeholder="Search by name or message..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={({ item }) => (
          <ChatItem
            id={item.id}  // Pass the missing 'id' prop here
            name={item.name}
            avatarUrl={item.avatarUrl}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
            unreadCount={item.unreadCount}
            onPress={() => console.log(`Chat with ${item.name} pressed`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaProvider>
  );
};

export default ChatListScreen;
