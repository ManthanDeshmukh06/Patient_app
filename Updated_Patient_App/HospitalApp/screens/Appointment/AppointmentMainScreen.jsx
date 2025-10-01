import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RecentMeetingsScreen from './RecentMeetingsScreen';
import ScheduleScreen from './ScheduleScreen';
import { COLORS } from '../../utils/colors';

export default function AppointmentsMainScreen({ navigation }) {
  const [tab, setTab] = useState('Meetings');
  const [code, setCode] = useState('');
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);

  // --- Edit/Delete Handlers ---
  const handleEdit = (meeting) => {
    Alert.alert("Edit Appointment", `Edit appointment with ${meeting.doctorName} (Pending action)`);
  };

  const handleDelete = (meeting) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the appointment with ${meeting.doctorName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => Alert.alert("Deleted", `Appointment with ${meeting.doctorName} deleted (simulated).`)
        }
      ]
    );
  };

  // --- Fetch Meetings ---
  const fetchMeetings = async () => {
    try {
      setLoadingMeetings(true);
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      if (!token || !userData) return;

      const user = JSON.parse(userData);
      const res = await axios.get(
        `http://10.0.2.2:3000/api/patient-appointments/patient/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.appointments) {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const futureMeetings = res.data.appointments.filter(a => {
          const meetingDateOnly = new Date(a.date);
          meetingDateOnly.setHours(0, 0, 0, 0);
          return meetingDateOnly >= startOfToday;
        });

        futureMeetings.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB;
        });

        setUpcomingMeetings(futureMeetings);
      } else {
        setUpcomingMeetings([]);
      }
    } catch (err) {
      console.log('Error fetching upcoming meetings:', err.response?.data || err.message);
    } finally {
      setLoadingMeetings(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
    const unsubscribe = navigation.addListener('focus', fetchMeetings);
    return unsubscribe;
  }, [navigation]);

  // --- Meeting Card ---
  const renderMeetingCard = (meeting) => (
    <View key={meeting.appointmentId} style={styles.meetingCard}>
      <View style={styles.cardInfo}>
        <Text style={styles.meetingTitle}>{meeting.doctorName}</Text>
        <Text style={styles.meetingInfo}>{meeting.date} • {meeting.time}</Text>
        <Text style={styles.meetingInfo}>Type: {meeting.sessionType}</Text>
      </View>

      <View style={styles.cardButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#FFD700' }]}
          onPress={() => handleEdit(meeting)}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Reschdule Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#FF6347' }]}
          onPress={() => handleDelete(meeting)}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Cancel Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTab = () => {
    switch (tab) {
      case 'Recent':
        return <RecentMeetingsScreen navigation={navigation} />;
      case 'Schedule':
        return <ScheduleScreen navigation={navigation} />;
      case 'Meetings':
      default:
        return (
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* Virtual Visit Section */}
            <Text style={styles.sectionTitle}>Virtual Visit</Text>
            <Text style={styles.sectionSubText}>
              Join a virtual consultation with a doctor using a code or link provided by the host.
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="keyboard-outline" size={20} color={COLORS.subtext} style={{ marginHorizontal: 8 }} />
              <TextInput
                placeholder="Enter a code or link"
                style={styles.input}
                value={code}
                onChangeText={setCode}
                placeholderTextColor="#666"
              />
            </View>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Virtual Consultation</Text>
            </TouchableOpacity>

            {/* Upcoming Meetings Section */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Upcoming Meetings</Text>

            {loadingMeetings ? (
              <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : upcomingMeetings.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 20, color: '#999' }}>No upcoming meetings</Text>
            ) : (
              upcomingMeetings.map(renderMeetingCard)
            )}
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabRow}>
        {['Meetings', 'Recent', 'Schedule'].map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.activeTab]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.activeText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>{renderTab()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Top Tabs
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#F3F6FA',
    borderRadius: 30,
    margin: 10,
    marginTop: 15,
  },
  tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  activeTab: { backgroundColor: '#2D9CDB' },
  tabText: { color: COLORS.subtext, fontWeight: '600', fontSize: 14 },
  activeText: { color: '#fff' },

  // Virtual Visit Section
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#000' },
  sectionSubText: { fontSize: 13, color: COLORS.subtext, marginBottom: 12 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#000' },
  joinButton: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  joinButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  // Meeting Cards
  meetingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: { flex: 1, marginRight: 12 }, // Ensure enough space for text
  cardButtons: { justifyContent: 'space-between' },
  actionButton: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
  marginTop: 4,
  alignItems: 'center',      // <-- Center horizontally
  justifyContent: 'center',  // <-- Center vertically
},

  buttonText: { fontWeight: '600', fontSize: 12 },
  meetingTitle: { fontSize: 16, fontWeight: '700', color: '#2D9CDB' },
  meetingInfo: { fontSize: 13, color: COLORS.subtext, marginTop: 4 },
});
