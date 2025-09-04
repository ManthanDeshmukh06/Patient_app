// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// import PatientScreen from './screens/PatientDashboardScreen'; // New patient dashboard

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen
//           name="ForgotPassword"
//           component={ForgotPasswordScreen}
//           options={{ title: 'Forgot Password' }}
//         />
//         <Stack.Screen
//           name="Patient"
//           component={PatientScreen}
//           options={{ headerShown: false }} // full screen dashboard
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
//import OTPVerificationScreen from "./src/screens/Auth/OTPVerificationScreen";

import HomeScreen from "./screens/Home/HomeScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import NearbyHospitalsScreen from "./screens/Hospital/NearbyHospitalsScreen";

import BookAppointmentScreen from "./screens/Appointment/BookAppointmentScreen";
import AppointmentStatusScreen from "./screens/Appointment/AppointmentStatusScreen";

import MedicalHistoryScreen from "./screens/Medical/MedicalHistoryScreen";
import UploadRecordsScreen from "./screens/Medical/UploadRecordsScreen";

import PrescriptionsScreen from "./screens/Prescreption/PrescriptionsScreen";
import NotificationsScreen from "./screens/Notification/NotificationsScreen";

import DietPlanScreen from "./screens/Diet/DietPlanScreen";
import BillingScreen from "./screens/Billing/BillingScreen";
import FeedbackScreen from "./screens/Feedback/FeedbackScreen";

// Navigation objects
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={BookAppointmentScreen} />
      <Tab.Screen name="Medical" component={MedicalHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        {/*<Stack.Screen name="OTP" component={OTPVerificationScreen} /> */}

        {/* Main Tabs */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Other Screens */}
        <Stack.Screen name="NearbyHospitals" component={NearbyHospitalsScreen} />
        <Stack.Screen name="AppointmentStatus" component={AppointmentStatusScreen} />
        <Stack.Screen name="UploadRecords" component={UploadRecordsScreen} />
        <Stack.Screen name="Prescriptions" component={PrescriptionsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="DietPlan" component={DietPlanScreen} />
        <Stack.Screen name="Billing" component={BillingScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
