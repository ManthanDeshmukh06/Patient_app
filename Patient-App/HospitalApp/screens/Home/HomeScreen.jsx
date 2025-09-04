// src/screens/Home/HomeScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Section from '../../components/Section';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import EmptyState from '../../components/EmptyState';
import { COLORS } from '../../utils/colors.js';


export default function HomeScreen({ navigation }) {
  const upcoming = [
    { id: 1, doctor: 'Dr. Anjali Verma', spec: 'Cardiologist', when: 'Tomorrow, 10:30 AM', hospital: 'CityCare Hospital' },
    { id: 2, doctor: 'Dr. R. Mehta', spec: 'Dermatologist', when: 'Sep 7, 04:00 PM', hospital: 'Lotus Clinic' },
  ];

  const recentHistory = [
    { id: 'h1', title: 'Asthma Review', date: 'Aug 22, 2025' },
    { id: 'h2', title: 'Flu', date: 'Jul 09, 2025' },
    { id: 'h3', title: 'Annual Checkup', date: 'May 13, 2025' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>Welcome, Manthan 👋</Text>
      <Text style={styles.sub}>Here’s a snapshot of your health today.</Text>

      <Section title="Upcoming Appointments" right={<CustomButton title="See all" onPress={() => navigation.navigate('Appointments')} style={styles.smallBtn} />}>
        {upcoming.length ? upcoming.map((a) => (
          <Card key={a.id}>
            <Text style={styles.cardTitle}>{a.doctor} — <Text style={styles.badge}>{a.spec}</Text></Text>
            <Text style={styles.meta}>🕒 {a.when}</Text>
            <Text style={styles.meta}>🏥 {a.hospital}</Text>
          </Card>
        )) : <EmptyState title="No upcoming appointments" subtitle="Book one from the Appointments tab."/>}
      </Section>

      <Section title="Latest Medical History">
        {recentHistory.map((h) => (
          <Card key={h.id}>
            <Text style={styles.cardTitle}>{h.title}</Text>
            <Text style={styles.meta}>📅 {h.date}</Text>
          </Card>
        ))}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  sub: { color: COLORS.subtext, marginBottom: 18 },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  cardTitle: { fontWeight: '800', color: COLORS.text, marginBottom: 6, fontSize: 16 },
  meta: { color: COLORS.subtext },
  badge: { color: COLORS.primary },
});
