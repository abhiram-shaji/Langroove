// /screens/FriendListScreen.tsx

import React from 'react';
import { SafeAreaView, FlatList, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFriendList } from '../hooks/useFriendList';
import FriendItem from '../components/FriendItem';
import { styles } from '../styles/FriendListStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../app/App';

type FriendListScreenProps = StackScreenProps<RootStackParamList, 'FriendList'>;

const FriendListScreen: React.FC<FriendListScreenProps> = ({ navigation }) => {
  const { search, setSearch, filteredFriends } = useFriendList();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FriendItem
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              onPress={() => navigation.navigate('Profile', { ownerId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FriendListScreen;
