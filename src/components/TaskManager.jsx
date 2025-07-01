import React, { useEffect, useState, useCallback } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = useCallback(() => {
    const token = localStorage.getItem('token'); // Moved inside
    fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data || []));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const token = localStorage.getItem('token'); // Also moved inside
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    }).then(() => {
      setTasks([...tasks, { title: newTask }]);
      setNewTask('');
    });
  };

  return (
    <div className="task-manager">
      <h2>Tasks</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span>{task.title}</span>
          </div>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
};

export default TaskManager;
