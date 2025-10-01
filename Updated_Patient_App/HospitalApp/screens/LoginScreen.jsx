'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!emailOrMobile.trim() || !password.trim()) {
    alert('Please enter email/mobile and password');
    return;
  }

  try {
    setLoading(true);
    console.log("Sending login request with:", { emailOrMobile, password });

    const res = await axios.post(
      'http://10.0.2.2:3000/patients/login',
      {
        emailOrMobile,
        password,
      },
    );

    console.log("Login response received:", res.data);

    if (res.data?.token) {
      console.log("Token found, saving to AsyncStorage");
      await AsyncStorage.setItem('token', res.data.token);

      if (res.data.user) {
        console.log("User object found, saving to AsyncStorage", res.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      } else {
        console.warn("No user object received from backend");
      }

      alert('Login successful!');
      setEmailOrMobile('');
      setPassword('');
      Keyboard.dismiss();
      navigation.replace('NearbyHospitals');
    } else {
      console.warn("No token received, login failed", res.data);
      alert(res.data.message || 'Login failed');
    }
  } catch (err) {
    console.error("Login error caught:", err.response?.data || err.message);
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
        onChangeText={text => setEmailOrMobile(text)}
        placeholderTextColor="#666"
        color="#000"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#666"
        color="#000"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Don’t have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9ff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4B00F5',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#4B00F5',
    fontWeight: '500',
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#444',
  },
  link: {
    color: '#4B00F5',
    fontWeight: '600',
  },
});

export default LoginScreen;
