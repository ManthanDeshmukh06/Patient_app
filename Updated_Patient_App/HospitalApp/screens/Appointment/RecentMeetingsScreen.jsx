// import React from 'react';
// import { ScrollView, Text, StyleSheet, View } from 'react-native';
// import Card from '../../components/Card';
// import { COLORS } from '../../utils/colors';

// export default function RecentMeetingsScreen() {
//   const meetings = [
//     {
//       id: 1,
//       date: '28 Aug 2025',
//       time: '09:30 AM',
//       patient: 'Prashant Kamble',
//     },
//     { id: 2, date: '25 Aug 2025', time: '10:15 AM', patient: 'Ramesh Yadav' },
//     { id: 3, date: '20 Jul 2025', time: '11:00 AM', patient: 'Sunita Sharma' },
//   ];

//   return (
//     <ScrollView style={styles.screen}>
//       <Text style={styles.title}>Recent Meetings</Text>
//       {meetings.map(m => (
//         <Card key={m.id}>
//           <Text style={styles.label}>Patient Meeting</Text>
//           <Text style={styles.meta}>Date: {m.date}</Text>
//           <Text style={styles.meta}>Time: {m.time}</Text>
//           <Text style={styles.meta}>Patient: {m.patient}</Text>
//         </Card>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { padding: 16 },
//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 12,
//     color: COLORS.text,
//   },
//   label: { fontWeight: '700', color: COLORS.text },
//   meta: { color: COLORS.subtext, marginTop: 4 },
// });
import React from 'react';
import { ScrollView, Text, StyleSheet, View, SafeAreaView } from 'react-native';
import Card from '../../components/Card';
// Assuming this import provides a color object, e.g., { text: '#333', subtext: '#777' }
import { COLORS } from '../../utils/colors'; 

export default function RecentMeetingsScreen() {
  const meetings = [
    {
      id: 1,
      date: '28 Aug 2025',
      time: '09:30 AM',
      patient: 'Prashant Kamble',
    },
    { id: 2, date: '25 Aug 2025', time: '10:15 AM', patient: 'Ramesh Yadav' },
    { id: 3, date: '20 Jul 2025', time: '11:00 AM', patient: 'Sunita Sharma' },
  ];

  return (
    // FIX: Wrap everything in SafeAreaView to avoid the camera notch/status bar
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Recent Meetings</Text>
        {meetings.map(m => (
          // Assuming Card is a simple View with background/shadow styling
          <Card key={m.id}>
            <Text style={styles.label}>Patient Meeting</Text>
            <Text style={styles.meta}>Date: {m.date}</Text>
            <Text style={styles.meta}>Time: {m.time}</Text>
            <Text style={styles.meta}>Patient: {m.patient}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Style for SafeAreaView to take full height
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Use your app's main background color here
  },
  // Apply padding to the ScrollView content, not the ScrollView itself
  scrollViewContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.text,
  },
  label: { fontWeight: '700', color: COLORS.text },
  meta: { color: COLORS.subtext, marginTop: 4 },
});