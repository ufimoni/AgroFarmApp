// src/components/Task/TaskList.jsx
import React from 'react';
import styles from './taskList.module.scss';

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      title: 'Water the maize crops',
      status: 'pending',
      description: 'Irrigate all maize crops in section A before 12 PM.',
    },
    {
      id: 2,
      title: 'Apply fertilizer',
      status: 'in-progress',
      description: 'Use NPK fertilizer for tomato plants.',
    },
    {
      id: 3,
      title: 'Harvest beans',
      status: 'completed',
      description: 'Harvest all mature bean plants in zone B.',
    },
  ];

  const getBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={`container ${styles.taskListContainer}`}>
      <h3 className="my-4 text-center">Task List for Farmers</h3>
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
            <div className={`card ${styles.taskCard}`}>
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Status: <span className={`badge bg-${getBadgeColor(task.status)}`}>{task.status}</span>
                </h6>
                <p className="card-text">{task.description}</p>
                <button className="btn btn-outline-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
