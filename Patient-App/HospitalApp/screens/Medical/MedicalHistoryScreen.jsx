// src/screens/Medical/MedicalHistoryScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import Section from '../../components/Section';
import { COLORS } from '../../utils/colors';

export default function MedicalHistoryScreen({ navigation }) {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [date, setDate] = useState('');
  const [history, setHistory] = useState([
    { id: 1, diagnosis: 'Flu', date: '2025-07-10', prescription: 'Paracetamol' },
    { id: 2, diagnosis: 'Asthma Review', date: '2025-08-20', prescription: 'Inhaler' },
  ]);

  const addItem = () => {
    if (!diagnosis || !prescription || !date) return;
    setHistory([{ id: Date.now(), diagnosis, prescription, date }, ...history]);
    setDiagnosis('');
    setPrescription('');
    setDate('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Medical History</Text>

        <Card>
          <TextInput
            placeholder="Diagnosis"
            style={styles.input}
            value={diagnosis}
            onChangeText={setDiagnosis}
          />
          <TextInput
            placeholder="Prescription"
            style={styles.input}
            value={prescription}
            onChangeText={setPrescription}
          />
          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />
          <CustomButton title="Add History" onPress={addItem} />
        </Card>

        <Section title="Previous Records" />
        {history.map((h) => (
          <Card key={h.id}>
            <Text style={styles.itemTitle}>{h.diagnosis}</Text>
            <Text style={styles.meta}>📅 {h.date}</Text>
            <Text style={styles.meta}>💊 {h.prescription}</Text>
          </Card>
        ))}

        <CustomButton
          title="Upload Medical Records"
          style={{ marginTop: 8 }}
          onPress={() => navigation.navigate('UploadRecords')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg, // keeps consistent background behind notch
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // extra bottom spacing
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    color: COLORS.text,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  meta: {
    color: COLORS.subtext,
  },
});
