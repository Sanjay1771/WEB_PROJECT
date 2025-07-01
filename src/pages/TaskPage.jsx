import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setTasks(data);
        }
      } catch (err) {
        console.error('Error loading tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const addTaskToList = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task Manager</h2>
      <TaskForm onAdd={addTaskToList} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;
