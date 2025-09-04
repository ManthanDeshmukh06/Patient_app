import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardHome = () => (
  <View style={styles.container}>
    <Text style={styles.text}>🏥 Welcome to Patient Dashboard</Text>
  </View>
);

export default DashboardHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
