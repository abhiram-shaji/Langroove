import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, TextInput } from 'react-native';
import { Appbar, Avatar, List, Divider } from 'react-native-paper';

// Define the type for a friend object
interface Friend {
  id: string;
  name: string;
  avatar: string;
}

const friendsData: Friend[] = [
  { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Michael Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

const FriendListScreen: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  // Filter the list of friends based on the search term
  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  // Render function for each friend in the list
  const renderFriend = ({ item }: { item: Friend }) => (
    <View>
      <List.Item
        title={item.name}
        left={() => <Avatar.Image size={48} source={{ uri: item.avatar }} />}
      />
      <Divider />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar for the Friends List screen */}
      <Appbar.Header>
        <Appbar.Content title="Friends List" />
      </Appbar.Header>

      {/* Replace SearchBar with TextInput */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={search}
        onChangeText={text => setSearch(text)}  // Regular handler works fine
      />

      {/* FlatList to display list of friends */}
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={renderFriend}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default FriendListScreen;
