import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Task {
  _id: string;
  task_name: string;
  task_description: string;
  completed_status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const response = await axios.get('api/v1/tasks');
      console.log('Tasks fetched:', response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setError('Failed to fetch tasks');
    }
  };

  const addTask = async () => {
    if (!taskName || !taskDescription) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newTask = {
        task_name: taskName,
        task_description: taskDescription,
        completed_status: false,
      };

      console.log('Adding task:', newTask);
      const response = await axios.post('api/v1/tasks', newTask);
      console.log('Task added:', response.data.task);
      setTasks([...tasks, response.data.task]);
      setTaskName('');
      setTaskDescription('');
      setError(null);
    } catch (error) {
      console.error('Error adding task', error);
      setError('Failed to add task');
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        {error && <p className="error-message">{error}</p>}
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.task_name}</h3>
              <p>{task.task_description}</p>
              <p>Status: {task.completed_status ? 'Completed' : 'Incomplete'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
