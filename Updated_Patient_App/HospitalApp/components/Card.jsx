// src/components/Card.js
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../utils/colors';

export default function Card({ children, style, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.98 : 1 }] }, // subtle press animation
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.card}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card, // or a light color like '#fff'
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 6,
    // Optional: subtle border
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
});
