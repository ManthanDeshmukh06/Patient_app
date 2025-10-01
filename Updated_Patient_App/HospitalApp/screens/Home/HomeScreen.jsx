import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // ✅ added
import { COLORS } from '../../utils/colors.js';
import RecentMeetingsScreen from '../Appointment/RecentMeetingsScreen.jsx';
import ScheduleScreen from '../Appointment/ScheduleScreen.jsx';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [savedAppointments, setSavedAppointments] = useState([]);
  const [userHospital, setUserHospital] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const hospitalData = await AsyncStorage.getItem('hospital');
        const token = await AsyncStorage.getItem('token');

        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || 'User');

          // ✅ fetch appointments from backend
          if (token) {
            try {
              const res = await axios.get(
                `http://10.0.2.2:3000/api/patient-appointments/patient/${user.id}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              if (res.data && res.data.appointments) {
                setSavedAppointments(res.data.appointments);
              }
            } catch (err) {
              console.log('Error fetching appointments:', err);
            }
          }
        }

        if (hospitalData) {
          setUserHospital(hospitalData);
        }
      } catch (err) {
        console.log('Error loading user:', err);
      }
    };

    loadUser();

    const unsubscribe = navigation.addListener('focus', loadUser);
    return unsubscribe;
  }, [navigation]);

  const healthRecords = [
    { id: 1, title: 'Lab Result', count: 10, color: '#FF6B6B' },
    { id: 2, title: 'Prescriptions', count: 5, color: '#1DD1A1' },
    { id: 3, title: 'Medical History', count: 12, color: '#54A0FF' },
  ];

  const medications = [
    { id: 1, name: 'Loratadin 5mg', dosage: '0-1-1', left: '3 Days left' },
    { id: 2, name: 'Brocopan 50mg', dosage: '1-0-0', left: '2 Days left' },
    { id: 3, name: 'Loratadin 5mg', dosage: '0-1-0', left: '5 Days left' },
    { id: 4, name: 'Mytiacin 5mg', dosage: '0-0-1', left: '8 Days left' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.userName}>Hello {userName}</Text>
          <Text style={styles.location}>{userHospital}</Text>
        </View>
        <View style={styles.avatar} />
      </View>

      {/* Health Records */}
      <Text style={styles.sectionTitle}>Health Records</Text>
      <View style={styles.healthRow}>
        {healthRecords.map(h => (
          <View key={h.id} style={styles.healthCard}>
            <View style={[styles.iconCircle, { backgroundColor: h.color }]} />
            <Text style={styles.healthText}>{h.title}</Text>
            <Text style={styles.healthCount}>{h.count}</Text>
          </View>
        ))}
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.rowHeader}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'Appointments',
              params: { screen: 'Schedule', params: { openForm: true } },
            })
          }
        >
          <Text style={styles.addBtnText}>Add Appointment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Doctor</Text>
          <Text style={styles.th}>Date</Text>
          <Text style={styles.th}>Time</Text>
          <Text style={styles.th}>Type</Text>
        </View>

        {savedAppointments.length > 0 ? (
          savedAppointments.map(a => (
            <View key={a.appointmentId} style={styles.tr}>
              <Text style={styles.td}>{a.doctorName}</Text>
              <Text style={styles.td}>{a.date}</Text>
              <Text style={styles.td}>{a.time}</Text>
              <Text style={styles.td}>{a.sessionType}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', padding: 20, color: '#999' }}>
            No upcoming appointments
          </Text>
        )}
      </View>

      {/* Medications */}
      <View style={styles.rowHeader}>
        <Text style={styles.sectionTitle}>Medications</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Medication Name</Text>
          <Text style={styles.th}>Dosage</Text>
          <Text style={styles.th}>Days Left</Text>
        </View>
        {medications.map(m => (
          <View key={m.id} style={styles.tr}>
            <Text style={styles.td}>{m.name}</Text>
            <Text style={styles.td}>{m.dosage}</Text>
            <Text style={styles.td}>{m.left}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F7FF', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: { fontSize: 18, fontWeight: '700', color: '#000' },
  location: { color: '#666' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc' },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },

  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  healthCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
  },
  iconCircle: { width: 30, height: 30, borderRadius: 15, marginBottom: 6 },
  healthText: { fontSize: 12, color: '#666' },
  healthCount: { fontSize: 16, fontWeight: '700', color: '#000' },

  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  addBtn: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  viewAll: { color: '#2D9CDB', fontWeight: '600' },

  table: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  th: { flex: 1, fontWeight: '700', fontSize: 12, color: '#000' },
  td: { flex: 1, fontSize: 12, color: '#333' },
});
