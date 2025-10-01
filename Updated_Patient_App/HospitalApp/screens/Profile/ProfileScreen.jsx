import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicalIcon from '../../Icons/MedicalIcon';
import EmergencyContactIcon from '../../Icons/EmergencyContactIcon';
import InsuranceIcon from '../../Icons/InsuranceIcon';
import NotificationIcon from '../../Icons/NotificationIcon';
import PaymentIcon from '../../Icons/PaymentIcon';
import EmailIcon from '../../Icons/EmailIcon';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Load user from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const MenuItem = ({ title, screen, Icon, subtitle }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (screen) navigation.navigate(screen);
      }}
    >
      <View style={styles.menuLeft}>
        {Icon && <Icon size={22} color="#00796B" />}
        <View>
          <Text style={styles.menuText}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* Profile Tab */}
      <MenuItem
        title={user?.name || 'Guest User'}
        subtitle={
          user?.email
            ? `${user.email} • ${user.mobile || ''}`
            : undefined
        }
        Icon={() => (
          <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/40' }}
            style={styles.avatarSmall}
          />
        )}
        screen="EditProfile"
      />

      {/* Other Tabs */}
      <MenuItem
        title="Assigned Doctors"
        screen="AssignedDoctors"
        Icon={MedicalIcon}
      />
      <MenuItem
        title="Emergency Contact"
        screen="EmergencyContact"
        Icon={EmergencyContactIcon}
      />
      <MenuItem
        title="Insurance Information"
        screen="InsuranceInformation"
        Icon={InsuranceIcon}
      />
      <MenuItem
        title="Notification Settings"
        screen="NotificationSettings"
        Icon={NotificationIcon}
      />
      <MenuItem
        title="Payment Settings"
        screen="PaymentSettings"
        Icon={PaymentIcon}
      />
      <MenuItem title="Change Email" screen="ChangeEmail" Icon={EmailIcon} />

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.replace('Login');
        }}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F6FB', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuText: { fontSize: 16, fontWeight: '600' },
  menuSubtitle: { fontSize: 14, color: '#555' },
  arrow: { fontSize: 20, color: '#888' },
  logoutBtn: {
    marginTop: 20,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: { fontSize: 16, color: 'red', fontWeight: '600' },
  avatarSmall: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
});
