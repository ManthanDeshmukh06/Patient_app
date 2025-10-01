import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AssignedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignedDoctors = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (!token || !userData) {
        console.error("Missing token or userData");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      const res = await axios.get(
        `http://10.0.2.2:3000/api/patient-appointments/patient/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Full API Response:", JSON.stringify(res.data, null, 2));

      if (!res.data || !Array.isArray(res.data.appointments)) {
        console.error("Unexpected API response:", res.data);
        setDoctors([]);
        return;
      }

      // ✅ Robust way to get unique doctors
      const doctorMap = new Map();
      res.data.appointments.forEach((appt) => {
        const key = appt.doctorName?.trim() + "-" + appt.specialization?.trim();
        if (!doctorMap.has(key)) {
          doctorMap.set(key, {
            doctorName: appt.doctorName,
            department: appt.specialization,
          });
        }
      });

      const uniqueDoctors = Array.from(doctorMap.values());
      console.log("Unique Doctors:", uniqueDoctors);

      setDoctors(uniqueDoctors);
    } catch (err) {
      console.error(
        "Error fetching assigned doctors:",
        err.response?.data || err.message
      );
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedDoctors();
  }, []);

  const renderDoctorCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorId}>Doctor: {item.doctorName}</Text>
      <Text style={styles.department}>Specialization: {item.department}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigned Doctors</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2D9CDB" />
      ) : doctors.length === 0 ? (
        <Text style={styles.emptyText}>No doctors assigned yet.</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item, index) => item.doctorName + index}
          renderItem={renderDoctorCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15, color: "#333" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#999" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  doctorId: { fontSize: 16, fontWeight: "600", color: "#2D9CDB" },
  department: { fontSize: 14, color: "#555", marginTop: 4 },
});
