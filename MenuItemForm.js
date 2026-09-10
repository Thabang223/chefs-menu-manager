// components/MenuItemForm.js
// Handles both "adding a new dish" and "editing an existing dish" — the
// screen that uses this just decides what happens on submit. Reusing one
// form component for both cases avoids duplicating the input/validation code.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COURSES } from '../utils/menuStats';

export default function MenuItemForm({ initialValues, onSubmit, submitLabel }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  // If we're editing an existing item, pre-fill the form with its values.
  useEffect(() => {
    if (initialValues) {
      setDishName(initialValues.dishName);
      setDescription(initialValues.description);
      setCourse(initialValues.course);
      setPrice(String(initialValues.price));
    }
  }, [initialValues]);

  function validate() {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required.';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }

    const numericPrice = parseFloat(price);
    if (!price.trim() || isNaN(numericPrice)) {
      newErrors.price = 'Enter a valid price.';
    } else if (numericPrice <= 0) {
      newErrors.price = 'Price must be greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    onSubmit({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    });

    // Reset the form after a successful add (editing screens navigate away,
    // so this only really matters for the "add new dish" flow).
    if (!initialValues) {
      setDishName('');
      setDescription('');
      setCourse(COURSES[0]);
      setPrice('');
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Grilled Salmon"
      />
      {errors.dishName ? <Text style={styles.error}>{errors.dishName}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Short description of the dish"
        multiline
      />
      {errors.description ? (
        <Text style={styles.error}>{errors.description}</Text>
      ) : null}

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseRow}>
        {COURSES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.courseButton, course === c && styles.courseButtonActive]}
            onPress={() => setCourse(c)}
          >
            <Text
              style={[
                styles.courseButtonText,
                course === c && styles.courseButtonTextActive,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 120"
        keyboardType="decimal-pad"
      />
      {errors.price ? <Text style={styles.error}>{errors.price}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a3a3a',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  error: {
    color: '#c0392b',
    fontSize: 12,
    marginTop: 4,
  },
  courseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  courseButtonActive: {
    backgroundColor: '#2e7d32',
  },
  courseButtonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  courseButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
