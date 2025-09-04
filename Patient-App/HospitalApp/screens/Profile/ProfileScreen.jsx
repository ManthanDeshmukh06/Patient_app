// src/screens/Profile/ProfileScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Section from '../../components/Section';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../utils/colors';

export default function ProfileScreen() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Manthan Deshmukh',
    email: 'manthan@example.com',
    phone: '+91 98765 43210',
    dob: '06 Nov 2004',
    blood: 'B+',
    gender: 'Male',
    address: '123 Main Street, Pune, India',
    emergency: 'Father • +91 91234 56789',
    allergies: 'Penicillin',
    conditions: 'Asthma',
    meds: 'Inhaler as prescribed',
    insurance: 'HDFC Ergo • Policy #ABX2391',
  });

  const Field = ({ label, value, onChange }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {editing ? (
        <TextInput value={value} onChangeText={onChange} style={styles.input} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <View style={styles.headerCurve} />
        <Image source={{ uri: 'https://via.placeholder.com/120' }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.mail}>{profile.email}</Text>
        <CustomButton title={editing ? 'Save Profile' : 'Edit Profile'} onPress={() => setEditing(!editing)} style={styles.headerBtn} />
      </View>

      <Section title="Personal Information">
        <Card>
          <Field label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
          <Field label="Gender" value={profile.gender} onChange={(v) => setProfile({ ...profile, gender: v })} />
          <Field label="Date of Birth" value={profile.dob} onChange={(v) => setProfile({ ...profile, dob: v })} />
          <Field label="Blood Group" value={profile.blood} onChange={(v) => setProfile({ ...profile, blood: v })} />
        </Card>
      </Section>

      <Section title="Contact">
        <Card>
          <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
          <Field label="Address" value={profile.address} onChange={(v) => setProfile({ ...profile, address: v })} />
          <Field label="Emergency Contact" value={profile.emergency} onChange={(v) => setProfile({ ...profile, emergency: v })} />
        </Card>
      </Section>

      <Section title="Medical">
        <Card>
          <Field label="Allergies" value={profile.allergies} onChange={(v) => setProfile({ ...profile, allergies: v })} />
          <Field label="Chronic Conditions" value={profile.conditions} onChange={(v) => setProfile({ ...profile, conditions: v })} />
          <Field label="Current Medication" value={profile.meds} onChange={(v) => setProfile({ ...profile, meds: v })} />
          <Field label="Insurance" value={profile.insurance} onChange={(v) => setProfile({ ...profile, insurance: v })} />
        </Card>
      </Section>

      {!editing && (
        <TouchableOpacity style={styles.changePwd}>
          <Text style={styles.changePwdTxt}>Change Password</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', marginBottom: 14 },
  headerCurve: {
    backgroundColor: COLORS.primary,
    height: 140,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: -60, borderWidth: 4, borderColor: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginTop: 10 },
  mail: { color: COLORS.subtext },
  headerBtn: { marginTop: 10, width: 160 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { width: 140, color: COLORS.subtext, fontWeight: '700' },
  value: { flex: 1, color: COLORS.text, fontWeight: '600' },
  input: {
    flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: COLORS.text,
  },
  changePwd: { alignSelf: 'center', marginTop: 8 },
  changePwdTxt: { color: COLORS.primary, fontWeight: '700' },
});
