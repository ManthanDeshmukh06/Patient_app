// src/screens/Feedback/FeedbackScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import Card from '../../components/Card';
import RatingStars from '../../components/RatingStars';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../utils/colors';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Feedback & Ratings</Text>

      <Card>
        <Text style={styles.label}>Rate your doctor</Text>
        <RatingStars value={rating} onChange={setRating} />
        <TextInput
          placeholder="Share your experience..."
          style={styles.input}
          multiline
          value={text}
          onChangeText={setText}
        />
        <CustomButton title="Submit Feedback" onPress={() => {}} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: COLORS.text },
  label: { color: COLORS.subtext, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, padding: 14, borderRadius: 12, marginTop: 12, minHeight: 120, textAlignVertical: 'top' },
});
