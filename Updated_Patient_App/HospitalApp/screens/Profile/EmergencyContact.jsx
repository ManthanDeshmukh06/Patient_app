import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EmergencyContact({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleCancel = () => {
    setShowDiscardModal(true);
  };

  const handleSave = () => {
    alert('Emergency contact saved!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency contact</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#666"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#666"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Relationship Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={relationship}
            onValueChange={itemValue => setRelationship(itemValue)}
            style={{ color: relationship ? '#000' : '#999' }} // 👈 fix
          >
            <Picker.Item label="Select Relationship" value="" color="#999" />
            <Picker.Item label="Parent" value="Parent" color="#000" />
            <Picker.Item label="Sibling" value="Sibling" color="#000" />
            <Picker.Item label="Friend" value="Friend" color="#000" />
            <Picker.Item label="Other" value="Other" color="#000" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#666"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* City Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={city}
            onValueChange={val => setCity(val)}
            style={{ color: city ? '#000' : '#999' }} // 👈 fix
          >
            <Picker.Item label="Select City" value="" color="#999" />
            <Picker.Item label="Boston" value="Boston" color="#000" />
            <Picker.Item label="New York" value="New York" color="#000" />
            <Picker.Item label="Chicago" value="Chicago" color="#000" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#666"
          value={address}
          onChangeText={setAddress}
        />
      </ScrollView>

      {/* Discard Modal */}
      <Modal visible={showDiscardModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Discard changes?</Text>
            <Text style={styles.modalSubtitle}>
              Unsaved changes will be lost.
            </Text>

            <TouchableOpacity
              style={styles.discardBtn}
              onPress={() => {
                setShowDiscardModal(false);
                navigation.goBack(); // go back to profile
              }}
            >
              <Text style={styles.discardText}>Yes, discard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepBtn}
              onPress={() => setShowDiscardModal(false)}
            >
              <Text style={styles.keepText}>No, keep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F6FB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#E6F6FB',
  },
  cancelText: { fontSize: 16, color: 'gray' },
  saveText: { fontSize: 16, color: '#00796B', fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  form: { padding: 16 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  discardBtn: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  discardText: { color: '#fff', fontWeight: '600' },
  keepBtn: {
    borderWidth: 1,
    borderColor: '#00796B',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  keepText: { color: '#00796B', fontWeight: '600' },
});
