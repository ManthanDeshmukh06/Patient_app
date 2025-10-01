import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({ navigation }) {
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Load user data
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFirstName(parsed.firstName || '');
        setLastName(parsed.lastName || '');
        setDob(parsed.dob || '');
        setPhone(parsed.phone || '');
        setCity(parsed.city || '');
        setAddress(parsed.address || '');
        setAvatar(parsed.avatar || 'https://via.placeholder.com/100');
      }
    };
    fetchUser();
  }, []);

  const handleCancel = () => {
    setShowDiscardModal(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      dob,
      phone,
      city,
      address,
      avatar,
    };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal information</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {/* Avatar */}
        <View style={styles.avatarBox}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity onPress={() => setAvatar('')}>
            <Text style={styles.deletePhoto}>🗑 Delete photo</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={user?.name || firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={user?.name || lastName}
          onChangeText={setLastName}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Date of birth (DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#666"
        />

        {/* City Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={city}
            onValueChange={val => setCity(val)}
            style={{ color: city ? '#000' : '#999' }}
          >
            <Picker.Item label="Select City" value="" color="#999" />
            <Picker.Item label="Pune City" value="Pune City" color="#000" />
            <Picker.Item label="Mumbai" value="Mumbai" color="#000" />
            <Picker.Item label="Delhi" value="Delhi" color="#000" />
            <Picker.Item label="Bangalore" value="Bangalore" color="#000" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#666"
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
                navigation.goBack();
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
  },
  cancelText: { fontSize: 16, color: 'gray' },
  saveText: { fontSize: 16, color: '#00796B', fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  form: { padding: 16 },
  avatarBox: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  deletePhoto: { color: 'red', fontWeight: '500' },
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
