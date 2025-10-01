// src/screens/Medical/MedicalHistoryScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import Section from '../../components/Section';
import { COLORS } from '../../utils/colors';

export default function MedicalHistoryScreen({ navigation }) {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // start with empty history list
  const [history, setHistory] = useState([]);

  const addItem = () => {
    if (!diagnosis || !prescription || !date) return;

    const newItem = {
      id: Date.now(),
      diagnosis,
      prescription,
      date,
      doctor,
    };

    setHistory(prev => [newItem, ...prev]);

    // clear form inputs
    setDiagnosis('');
    setPrescription('');
    setDate('');
    setDoctor('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Medical History</Text>

          {/* Input Card */}
          <Card>
            <TextInput
              placeholder="Diagnosis (e.g. Flu, Asthma Review)"
              placeholderTextColor="#777"
              style={styles.input}
              value={diagnosis}
              onChangeText={setDiagnosis}
            />
            <TextInput
              placeholder="Prescription / Medication (e.g. Paracetamol, Inhaler)"
              placeholderTextColor="#777"
              style={styles.input}
              value={prescription}
              onChangeText={setPrescription}
            />

            {/* Date picker input */}
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <View pointerEvents="none">
                <TextInput
                  placeholder="Select Date"
                  placeholderTextColor="#777"
                  style={styles.input}
                  value={date}
                  editable={false}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Doctor's Name (e.g. Dr. John Doe)"
              placeholderTextColor="#777"
              style={styles.input}
              value={doctor}
              onChangeText={setDoctor}
            />

            <CustomButton title="Add History" onPress={addItem} />
          </Card>

          {/* History Section */}
          <Section title="Previous Records" />
          {history.length === 0 ? (
            <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
              No records added yet.
            </Text>
          ) : (
            history.map(h => (
              <Card key={h.id}>
                <Text style={styles.itemTitle}>{h.diagnosis}</Text>
                <Text style={styles.meta}>📅 {h.date}</Text>
                <Text style={styles.meta}>💊 {h.prescription}</Text>
                {h.doctor ? (
                  <Text style={styles.meta}>👨‍⚕️ {h.doctor}</Text>
                ) : null}
              </Card>
            ))
          )}

          {/* Bottom Upload Button */}
          <View style={styles.bottomSpacer}>
            <CustomButton
              title="Upload Lab Records"
              onPress={() => navigation.navigate('UploadRecords')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.calendarWrapper}>
            <Calendar
              onDayPress={day => {
                setDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [date]: { selected: true, selectedColor: COLORS.primary },
              }}
              minDate={'2000-01-01'}
              maxDate={new Date().toISOString().split('T')[0]}
            />

            <CustomButton
              title="Close"
              style={{ marginTop: 12 }}
              onPress={() => setShowCalendar(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
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
    fontSize: 15,
    color: COLORS.text,
  },
  itemTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  meta: {
    color: COLORS.subtext,
    marginBottom: 4,
  },
  bottomSpacer: {
    marginTop: 16,
    marginBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    elevation: 5,
  },
});
