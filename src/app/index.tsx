import React, {useState} from 'react';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ListContainer from '../components/streakList/ListContainer';
import { useLayoutEffect } from 'react';

const HomeLayout = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

    // set dynamic scroll view based on height of the footer to avoid list items hiding behind footer
    const [footerHeight, setFooterHeight] = useState(0);

    const onFooterLayout = (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setFooterHeight(height);
    };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: footerHeight }}>
        <ListContainer />
      </ScrollView>


      <View style={styles.footer} onLayout={onFooterLayout}>
        <View style={styles.row}>
          <Link href="/CreateStreak" style={styles.createButton}>
            Create
          </Link>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('settings')}
          >
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeLayout;

/* ---------------------------
   Updated Styles
---------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createButton: {
    flex: 1, // Take most of the space
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 8,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 50, // Fixed square size
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Spacing between buttons
  },
});
