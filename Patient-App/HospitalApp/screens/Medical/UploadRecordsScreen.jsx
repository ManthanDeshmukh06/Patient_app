// src/screens/Medical/UploadRecordsScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import EmptyState from '../../components/EmptyState';
import { COLORS } from '../../utils/colors';

export default function UploadRecordsScreen() {
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [items, setItems] = useState([
    { id: 1, title: 'Blood Test Report', file: 'blood_report.pdf', date: 'Aug 12, 2025' },
  ]);

  const add = () => {
    if (!title || !fileName) return;
    setItems([{ id: Date.now(), title, file: fileName, date: 'Now' }, ...items]);
    setTitle(''); setFileName('');
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>View / Upload Medical Records</Text>

      <Card>
        <TextInput placeholder="Record Title" style={styles.input} value={title} onChangeText={setTitle} />
        <TextInput placeholder="File name (e.g., report.pdf)" style={styles.input} value={fileName} onChangeText={setFileName} />
        <CustomButton title="Add Record" onPress={add} />
      </Card>

      {items.length ? items.map((i) => (
        <Card key={i.id}>
          <Text style={styles.item}>{i.title}</Text>
          <Text style={styles.meta}>📄 {i.file}</Text>
          <Text style={styles.meta}>📅 {i.date}</Text>
        </Card>
      )) : <EmptyState title="No records uploaded" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: COLORS.text },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, padding: 14, borderRadius: 12, marginBottom: 12 },
  item: { fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  meta: { color: COLORS.subtext },
});
