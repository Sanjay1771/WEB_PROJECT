import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import './DashboardPage.css';

const DashboardPage = () => {
  const [selectedSection, setSelectedSection] = useState('My Day');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get('token');
    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      window.history.replaceState({}, document.title, '/dashboard');
    }
  }, []);

  const token = localStorage.getItem('token') || '';

  const fetchTasks = useCallback(() => {
    fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
      })
      .catch(() => setTasks([]));
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTask,
        description: selectedSection,
      }),
    }).then(() => {
      setNewTask('');
      fetchTasks();
    });
  };

  const filteredTasks = tasks.filter(
    (t) => t.description?.toLowerCase() === selectedSection.toLowerCase()
  );

  const handleDeleteTask = (index) => {
    const taskToDelete = filteredTasks[index];
    if (!taskToDelete?._id) return;

    fetch(`http://localhost:5000/api/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => fetchTasks());
  };

  const handleToggleComplete = (index) => {
    const taskToUpdate = filteredTasks[index];
    if (!taskToUpdate?._id) return;

    fetch(`http://localhost:5000/api/tasks/${taskToUpdate._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !taskToUpdate.completed }),
    }).then(() => fetchTasks());
  };

  return (
    <div className="dashboard-container">
      <Sidebar selected={selectedSection} onSelect={setSelectedSection} />
      <div className="main-panel">
        <h2>{selectedSection}</h2>

        {/* 🔼 Add Task input at the top */}
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={handleAddTask}>+</button>
        </div>

        {/* 🔽 Task List below input */}
        <div className="task-list">
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggle={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
