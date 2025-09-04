// src/components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/colors';

export default function CustomButton({ title, onPress, style, loading, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[styles.btn, disabled ? styles.disabled : null, style]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.txt}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 5,
  },
  txt: { color: '#fff', fontWeight: '700', fontSize: 16, letterSpacing: 0.3 },
  disabled: { opacity: 0.7 },
});
