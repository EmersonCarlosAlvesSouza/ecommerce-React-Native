import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function Home() {
  const { user } = useContext(AppContext);
  const colors = [];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.square, { backgroundColor: color }]}
            onPress={() => console.log('Quadrado', index + 1, 'clicado')}
          />
        ))}
      </View>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  square: {
    width: 100,
    height: 130,
    backgroundColor: 'gray',
    margin: 5,
  },
  userInfo: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
  },
});
