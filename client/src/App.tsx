import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Modal from './components/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

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

  const editTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const saveTask = async (name: string, description: string) => {
    if (!currentTask) return;
    
    try {
      const updatedTask = { ...currentTask, task_name: name, task_description: description };
      await axios.patch(`api/v1/tasks/${currentTask._id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === currentTask._id ? updatedTask : task)));
      setIsModalOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error updating task', error);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      console.log('Deleting task with ID:', id);
      await axios.delete(`api/v1/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
      setError('Failed to delete task');
    }
  };

  return (
    <div className="container mx-auto p-4 w-full md:w-3/5">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex justify-center">
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Task
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-100 p-4 mb-2 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{task.task_name}</h3>
              <p>{task.task_description}</p>
              <p>Status: {task.completed_status ? 'Completed' : 'Incomplete'}</p>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => editTask(task)}
                className="text-yellow-500 hover:text-yellow-700"
                aria-label="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && currentTask && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskName={currentTask.task_name}
          taskDescription={currentTask.task_description}
          onSave={saveTask}
        />
      )}
    </div>
  );
}

export default App;
