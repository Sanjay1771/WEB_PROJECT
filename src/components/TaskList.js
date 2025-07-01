import React from 'react';
// (Make sure no missing CSS import if not used)

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul className="task-list-ul">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task, i) => (
          <li key={task._id} className="task-list-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(i)}
            />
            <span
              className="task-title"
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </span>
            <button className="delete-button" onClick={() => onDelete(i)}>🗑️</button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
