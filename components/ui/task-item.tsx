import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 1. Update the interface to exactly match what HomeScreen is sending
interface TaskItemProps {
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function TaskItem({ title, isCompleted, onToggle }: TaskItemProps) {
  return (
    // Make the whole item clickable to toggle it
    <TouchableOpacity 
      style={[styles.container, isCompleted && styles.containerCompleted]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      {/* 2. Visual Checkbox */}
      <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </View>
      
      {/* 3. Task Title (with conditional strikethrough) */}
      <Text style={[styles.taskText, isCompleted && styles.taskTextCompleted]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// 4. Dark Theme Styles to match your HomeScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E', // Matches your input container
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  containerCompleted: {
    opacity: 0.7, // Fades the whole card out slightly when done
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF', // Matches your Add button
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
  },
  taskTextCompleted: {
    color: '#888', // Grey out completed text
    textDecorationLine: 'line-through', // Strike a line through it
  },
});