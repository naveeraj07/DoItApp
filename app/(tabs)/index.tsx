import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
// Import the TaskItem we created! (Adjust the path if necessary based on where your index file is)
import TaskItem from '../../components/ui/task-item'; 

// Define what a "Task" looks like
interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export default function HomeScreen() {
  // 1. State for the text being typed
  const [taskText, setTaskText] = useState('');
  // 2. State for our actual list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a new task
  const addTask = () => {
    if (taskText.trim() === '') return; // Prevent adding empty tasks
    
    const newTask: Task = {
      id: Date.now().toString(), // Generate a simple unique ID
      text: taskText,
      isCompleted: false,
    };
    
    setTasks([...tasks, newTask]); // Add to the list
    setTaskText(''); // Clear the input field
  };

  // Function to toggle a task's complete status
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>DOITAPP</Text>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          placeholderTextColor="#888"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem 
            title={item.text} 
            isCompleted={item.isCompleted} 
            onToggle={() => toggleTask(item.id)} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});