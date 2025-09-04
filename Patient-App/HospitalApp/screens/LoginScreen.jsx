'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_PHONE } from '@env';

const LoginScreen = ({ navigation }) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   if (!emailOrMobile.trim() || !password.trim()) {
  //     alert('Please enter email/mobile and password');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await axios.post(`${API_BASE_PHONE}/api/auth/login`, {
  //       emailOrMobile,
  //       password,
  //     });

  //     if (res.data?.token) {
  //       await AsyncStorage.setItem('token', res.data.token);
  //       await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

  //       alert('Login successful!');
  //       setEmailOrMobile('');
  //       setPassword('');
  //       Keyboard.dismiss();

  //       // Redirect to PatientScreen after login
  //       navigation.replace('Patient');
  //     } else {
  //       alert(res.data.message || 'Login failed');
  //     }
  //   } catch (err) {
  //     console.log('Login Error:', err.response?.data || err.message);
  //     alert(err.response?.data?.message || 'Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async () => {
  if (!emailOrMobile.trim() || !password.trim()) {
    alert('Please enter email/mobile and password');
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post(`${API_BASE_PHONE}/api/auth/login`, {
      emailOrMobile,
      password,
    });

    if (res.data?.token) {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login successful!');
      setEmailOrMobile('');
      setPassword('');
      Keyboard.dismiss();

      // ✅ Correct screen name
      navigation.replace('Main');
    } else {
      alert(res.data.message || 'Login failed');
    }
  } catch (err) {
    console.log('Login Error:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>

      <TextInput
        placeholder="Email or Mobile"
        style={styles.input}
        value={emailOrMobile}
        onChangeText={setEmailOrMobile}
        placeholderTextColor="#666"
        color="#000"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
        color="#000"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9ff', flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 14, marginBottom: 16, borderRadius: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#4B00F5', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  forgotPasswordText: { marginTop: 12, textAlign: 'center', color: '#4B00F5', fontWeight: '500' },
  bottomText: { marginTop: 20, textAlign: 'center', color: '#444' },
  link: { color: '#4B00F5', fontWeight: '600' },
});

export default LoginScreen;
// 'use client';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Keyboard,
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_PHONE } from '@env';

// const hospitals = ['Hospital A', 'Hospital B', 'Hospital C', 'Hospital D'];

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [hospital, setHospital] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showHospitals, setShowHospitals] = useState(false);

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim() || !hospital) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${API_BASE_PHONE}/api/auth/login`, {
//         email,
//         password,
//         hospital,
//       });

//       if (res.data?.token) {
//         await AsyncStorage.setItem('token', res.data.token);
//         await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

//         alert('Login successful!');
//         setEmail('');
//         setPassword('');
//         setHospital('');
//         Keyboard.dismiss();
//         navigation.replace('Patient');
//       } else {
//         alert(res.data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.log('Login Error:', err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       {/* Branding */}
//       <View style={styles.brandSection}>
//         <Image
//           //source={require('../assets/logo.png')} // replace with your logo
//           style={styles.logo}
//         />
//         <Text style={styles.appName}>MediCare HMS</Text>
//         <Text style={styles.subText}>Hospital Management System</Text>
//       </View>

//       {/* Login Card */}
//       <View style={styles.card}>
//         <Text style={styles.portalTitle}>Login Portal</Text>
//         <Text style={styles.portalSubtitle}>
//           Access your hospital management dashboard
//         </Text>

//         <TextInput
//           placeholder="Email Address"
//           style={styles.input}
//           placeholderTextColor="#666"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="Password"
//           style={styles.input}
//           placeholderTextColor="#666"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         {/* Hospital Selector */}
//                 <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowHospitals(true)}
//         >
//           <Text style={{ color: hospital ? '#000' : '#666' }}>
//             {hospital || 'Select Hospital'}
//           </Text>
//         </TouchableOpacity>

//         {/* Hospital Modal */}
//         <Modal visible={showHospitals} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalBox}>
//               <Text style={styles.modalTitle}>Choose Hospital</Text>
//               <FlatList
//                 data={hospitals}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.option}
//                     onPress={() => {
//                       setHospital(item);
//                       setShowHospitals(false);
//                     }}
//                   >
//                     <Text style={styles.optionText}>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowHospitals(false)}
//                 style={styles.closeBtn}
//               >
//                 <Text style={styles.closeBtnText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Sign In</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: '#f8f9ff',
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   brandSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   logo: { width: 60, height: 60, marginBottom: 10 },
//   appName: { fontSize: 24, fontWeight: '700', color: '#0056D2' },
//   subText: { fontSize: 14, color: '#666', marginBottom: 20 },

//   card: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   portalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#0056D2',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   portalSubtitle: {
//     fontSize: 14,
//     color: '#444',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 14,
//     marginBottom: 12,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     fontSize: 14,
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#0056D2',
//   },
//   option: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   optionText: { fontSize: 16, color: '#333' },
//   closeBtn: {
//     marginTop: 10,
//     padding: 12,
//     backgroundColor: '#0056D2',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   closeBtnText: { color: '#fff', fontWeight: '600' },

//   button: {
//     backgroundColor: '#0056D2',
//     paddingVertical: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
// });

// export default LoginScreen;
