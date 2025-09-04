// src/screens/Hospitals/NearbyHospitalsScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import Card from '../../components/Card';
import Section from '../../components/Section';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../utils/colors';

export default function NearbyHospitalsScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const hospitals = [
    { id: 1, name: 'CityCare Hospital', area: 'Shivajinagar', rating: 4.6, specialties: 'Cardiology, ENT' },
    { id: 2, name: 'Lotus Clinic', area: 'Kothrud', rating: 4.4, specialties: 'Dermatology, Pediatrics' },
    { id: 3, name: 'Sunrise Multispeciality', area: 'Viman Nagar', rating: 4.7, specialties: 'Ortho, Neuro' },
  ];

  const filtered = hospitals.filter(h =>
    [h.name, h.area, h.specialties].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 24 }}>
      <TextInput
        placeholder="Search hospitals or symptoms (e.g., chest pain)"
        placeholderTextColor={COLORS.subtext}
        style={styles.search}
        value={query}
        onChangeText={setQuery}
      />
      <Section title="Nearby Hospitals">
        {filtered.map(h => (
          <Card key={h.id}>
            <Text style={styles.title}>{h.name}</Text>
            <Text style={styles.meta}>📍 {h.area}</Text>
            <Text style={styles.meta}>⭐ {h.rating} • {h.specialties}</Text>
            <CustomButton title="View Doctors" style={{ marginTop: 10 }} onPress={() => navigation.navigate('Appointments', { hospital: h })} />
          </Card>
        ))}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  search: {
    backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 14, marginBottom: 16,
  },
  title: { fontWeight: '800', fontSize: 16, color: COLORS.text, marginBottom: 6 },
  meta: { color: COLORS.subtext },
});
