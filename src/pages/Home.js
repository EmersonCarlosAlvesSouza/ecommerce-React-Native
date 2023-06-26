import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const colors = [
    
  ];

  return (
    <View style={styles.container}>
      <Text> Tela Principal</Text>
      <View style={styles.gridContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.square, { backgroundColor: color }]}
            onPress={() => console.log('Quadrado', index + 1, 'clicado')}
          />
        ))}
      </View>
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
});
