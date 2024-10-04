// /screens/FriendListScreen.tsx

import React from 'react';
import { SafeAreaView, FlatList, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFriendList } from '../hooks/useFriendList';
import FriendItem from '../components/FriendItem';
import { styles } from '../styles/FriendListStyles';

const FriendListScreen: React.FC = () => {
  const { search, setSearch, filteredFriends } = useFriendList();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* AppBar for the Friends List screen */}
        <Appbar.Header>
          <Appbar.Content title="Friends List" />
        </Appbar.Header>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={search}
          onChangeText={setSearch}  // Regular handler works fine
        />

        {/* FlatList to display the filtered list of friends */}
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FriendItem id={item.id} name={item.name} avatar={item.avatar} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FriendListScreen;
