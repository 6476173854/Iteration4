import React from 'react';

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.sort((a, b) => a.priority.localeCompare(b.priority)).map((task) => (
                    <li key={task.id}>
                        <span style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'gray' : 'black',
                        }}>
                            {task.task} - {task.priority}
                        </span>
                        <button onClick={() => toggleComplete(task.id)}>
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
