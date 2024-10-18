import React from 'react';
import { FlatList, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatItem from '../components/ChatItem';
import { useChatList } from '../hooks/useChatList'; // Use the updated hook
import BottomNavBar from '../components/BottomNavBar';
import { styles } from '../styles/ChatListStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatList'>;

const ChatListScreen: React.FC = () => {
  const { search, setSearch, filteredChats } = useChatList(); // Fetch chat list from the hook
  const navigation = useNavigation<ChatListScreenNavigationProp>(); // For navigating to individual chats

  const handleChatPress = (recipientId: string) => {
    // Navigate to the ChatScreen with the recipientId
    navigation.navigate('Chat', { recipientId });
  };

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
            id={item.id}  // Chat ID
            name={item.name}
            avatarUrl={item.avatarUrl}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
            unreadCount={item.unreadCount}
            onPress={() => handleChatPress(item.id)} // Navigate to chat on press
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </SafeAreaProvider>
  );
};

export default ChatListScreen;
