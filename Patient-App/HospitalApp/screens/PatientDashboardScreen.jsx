// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
//   Image,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Tab = createBottomTabNavigator();
// const API_BASE = 'http://10.0.2.2:5000';

// // 🏠 Home Screen
// const HomeScreen = () => {
//   const [latestHistory, setLatestHistory] = useState([]);

//   const fetchLatestHistory = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${API_BASE}/api/patient/medical-history`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLatestHistory(res.data.slice(0, 3));
//     } catch (err) {
//       console.log('Fetch latest history error:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchLatestHistory();
//   }, []);

//   return (
//     <ScrollView style={styles.screen}>
//       <Text style={styles.heading}>Welcome, Manthan 👋</Text>
//       <Text style={styles.subHeading}>
//         Here you can see upcoming appointments and your latest medical history.
//       </Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Latest Medical History</Text>
//         {latestHistory.length === 0 ? (
//           <Text style={styles.emptyText}>No medical history yet.</Text>
//         ) : (
//           latestHistory.map((item, index) => (
//             <View key={index} style={styles.card}>
//               <Text style={styles.cardTitle}>{item.diagnosis}</Text>
//               <Text style={styles.cardText}>Prescription: {item.prescription}</Text>
//               <Text style={styles.cardText}>Date: {item.date}</Text>
//             </View>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// // 👤 Profile Screen
// const ProfileScreen = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [password, setPassword] = useState('');
//   const [instagram, setInstagram] = useState('');

//   const fetchProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${API_BASE}/api/patient/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const userData = res.data;
//       setName(userData.name);
//       setEmail(userData.email);
//       setPhone(userData.phone);
//       setBirthday(userData.birthday);
//       setInstagram(userData.instagram);
//     } catch (err) {
//       console.log('Fetch profile error:', err.response?.data || err.message);
//       // Fallback to dummy data as requested
//       setName('Manthan');
//       setEmail('manthan@example.com');
//       setPhone('1234567890');
//       setBirthday('06-11-2004');
//       setInstagram('manthan');
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.put(
//         `${API_BASE}/api/patient/profile`,
//         { name, email, phone, birthday, password, instagram },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       Alert.alert('Success', 'Profile updated successfully!');
//       setIsEditing(false);
//     } catch (err) {
//       console.log('Update profile error:', err.response?.data || err.message);
//       Alert.alert('Error', err.response?.data?.message || 'Failed to update profile.');
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <ScrollView style={styles.profileScreen}>
//       <View style={styles.headerBackground}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/150/8a2be2/ffffff?text=AA' }}
//           style={styles.avatar}
//         />
//         <Text style={styles.nameHeader}>{name}</Text>
//       </View>

//       <View style={styles.profileDetailsContainer}>
//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>👤</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={name}
//               onChangeText={setName}
//             />
//           ) : (
//             <Text style={styles.profileText}>{name}</Text>
//           )}
//         </View>

//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>🗓️</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={birthday}
//               onChangeText={setBirthday}
//               placeholder="Birthday"
//             />
//           ) : (
//             <Text style={styles.profileText}>{birthday ? birthday : 'Birthday'}</Text>
//           )}
//         </View>

//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>📱</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//               placeholder="Phone Number"
//             />
//           ) : (
//             <Text style={styles.profileText}>{phone}</Text>
//           )}
//         </View>

//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>📷</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={instagram}
//               onChangeText={setInstagram}
//               placeholder="Instagram Account"
//             />
//           ) : (
//             <Text style={styles.profileText}>{instagram ? instagram : 'Instagram account'}</Text>
//           )}
//         </View>

//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>📧</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               placeholder="Email"
//             />
//           ) : (
//             <Text style={styles.profileText}>{email}</Text>
//           )}
//         </View>

//         <View style={styles.profileItem}>
//           <Text style={styles.icon}>🔒</Text>
//           {isEditing ? (
//             <TextInput
//               style={styles.editInput}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               placeholder="Change Password"
//             />
//           ) : (
//             <Text style={styles.profileText}>Password</Text>
//           )}
//           <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={{ marginLeft: 'auto' }}>
//              <Text style={styles.updatePasswordIcon}>🔄</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => {
//             if (isEditing) {
//               handleUpdateProfile();
//             } else {
//               setIsEditing(true);
//             }
//           }}
//         >
//           <Text style={styles.editButtonText}>
//             {isEditing ? 'Save Profile' : 'Edit profile'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// // 📋 Medical History Screen
// const MedicalHistoryScreen = () => {
//   const [diagnosis, setDiagnosis] = useState('');
//   const [prescription, setPrescription] = useState('');
//   const [date, setDate] = useState('');
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${API_BASE}/api/patient/medical-history`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHistory(res.data);
//     } catch (err) {
//       console.log('Fetch history error:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handleAddHistory = async () => {
//     if (!diagnosis || !prescription || !date) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.post(
//         `${API_BASE}/api/patient/medical-history`,
//         { diagnosis, prescription, date },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Alert.alert('Success', 'Medical history added!');
//       setDiagnosis('');
//       setPrescription('');
//       setDate('');
//       fetchHistory();
//     } catch (err) {
//       console.log('Add history error:', err.response?.data || err.message);
//       Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <ScrollView style={styles.screen}>
//       <Text style={styles.heading}>Medical History</Text>

//       <View style={styles.section}>
//         <TextInput
//           placeholder="Diagnosis"
//           style={styles.input}
//           value={diagnosis}
//           onChangeText={setDiagnosis}
//         />
//         <TextInput
//           placeholder="Prescription"
//           style={styles.input}
//           value={prescription}
//           onChangeText={setPrescription}
//         />
//         <TextInput
//           placeholder="Date (YYYY-MM-DD)"
//           style={styles.input}
//           value={date}
//           onChangeText={setDate}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={handleAddHistory}>
//           <Text style={styles.addButtonText}>Add History</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         {history.length === 0 ? (
//           <Text style={styles.emptyText}>No medical history yet.</Text>
//         ) : (
//           history.map((item, index) => (
//             <View key={index} style={styles.card}>
//               <Text style={styles.cardTitle}>{item.diagnosis}</Text>
//               <Text style={styles.cardText}>Prescription: {item.prescription}</Text>
//               <Text style={styles.cardText}>Date: {item.date}</Text>
//             </View>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// // ⭐ Feedback Screen
// const FeedbackScreen = () => (
//   <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
//     <Text style={styles.heading}>Rate Your Doctor ⭐⭐⭐⭐</Text>
//     <Text style={styles.subHeading}>Provide feedback about your experience.</Text>
//   </View>
// );

// export default function PatientDashboardScreen() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//         tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '🏠 Home' }} />
//       <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: '👤 Profile' }} />
//       <Tab.Screen
//         name="MedicalHistory"
//         component={MedicalHistoryScreen}
//         options={{ tabBarLabel: '📋 History' }}
//       />
//       <Tab.Screen name="Feedback" component={FeedbackScreen} options={{ tabBarLabel: '⭐ Feedback' }} />
//     </Tab.Navigator>
//   );
// }

// // 🎨 Styling
// const styles = StyleSheet.create({
//   screen: { flex: 1, padding: 20, backgroundColor: '#f3f4fd' },
//   profileScreen: { flex: 1, backgroundColor: '#f3f4fd' },

//   // Headings
//   heading: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: '#222' },
//   subHeading: { fontSize: 14, color: '#666', marginBottom: 20 },

//   // Sections
//   section: { marginBottom: 25 },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 12,
//     color: '#4B00F5',
//   },

//   // Inputs
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 14,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     marginBottom: 12,
//     fontSize: 14,
//   },
//   editInput: {
//     flex: 1,
//     paddingVertical: 10,
//     fontSize: 16,
//     color: '#333',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },

//   // Buttons
//   addButton: {
//     backgroundColor: '#4B00F5',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

//   // Cards
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#333' },
//   cardText: { fontSize: 14, color: '#444', marginBottom: 2 },
//   emptyText: { fontSize: 14, color: '#999', fontStyle: 'italic' },

//   // Profile
//   headerBackground: {
//     backgroundColor: '#6a0dad', // A nice purple gradient
//     paddingTop: 50,
//     paddingBottom: 20,
//     alignItems: 'center',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4,
//     borderColor: '#fff',
//     marginBottom: 12,
//   },
//   nameHeader: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   profileDetailsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginTop: -40,
//     marginHorizontal: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   profileItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   icon: {
//     fontSize: 20,
//     marginRight: 15,
//   },
//   profileText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   editButton: {
//     marginTop: 20,
//     backgroundColor: '#4B00F5',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   editButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   updatePasswordIcon: {
//     fontSize: 20,
//     color: '#888',
//   },

//   // Bottom Tab
//   tabBar: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     height: 70,
//     paddingBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -3 },
//     shadowRadius: 6,
//     elevation: 10,
//   },
// });

// src/screens/PatientDashboardScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home/HomeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import BookAppointmentScreen from './Appointments/BookAppointmentScreen';
import MedicalHistoryScreen from './Medical/MedicalHistoryScreen';
import { COLORS } from '../utils/colors';
import NearbyHospitalsScreen from './Hospitals/NearbyHospitalsScreen';

const Tab = createBottomTabNavigator();

export default function PatientDashboardScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          position: 'absolute',
        },
        tabBarLabelStyle: { fontWeight: '700', marginBottom: 6 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '🏠 Home' }} />
      <Tab.Screen name="Hospitals" component={NearbyHospitalsScreen} options={{ tabBarLabel: '🏥 Hospitals' }} />
      <Tab.Screen name="Appointments" component={BookAppointmentScreen} options={{ tabBarLabel: '📅 Book' }} />
      <Tab.Screen name="History" component={MedicalHistoryScreen} options={{ tabBarLabel: '📋 History' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: '👤 Profile' }} />
    </Tab.Navigator>
  );
}
