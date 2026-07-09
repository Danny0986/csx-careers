function TaskList({ tasks, handleToggleTask, handleDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article
          className={`task-card ${task.completed ? "completed" : ""}`}
          key={task.id}
        >
          <div className="task-content">
            <label className="task-check">
              <input
                type="checkbox"
                checked={task.completed}
                disabled={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />
              <span aria-hidden="true"></span>
            </label>

            <div>
              <span className="task-status">
                {task.completed ? "Completada" : "Pendiente"}
              </span>

              <p>{task.text}</p>
            </div>
          </div>

          <div className="task-actions">
            <button
              type="button"
              className="delete-button"
              aria-label={`Eliminar tarea ${task.text}`}
              onClick={() => handleDeleteTask(task.id)}
            >
              <svg
                className="trash-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 6L18.25 19C18.19 20.08 17.31 21 16.23 21H7.77C6.69 21 5.81 20.08 5.75 19L5 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M14 11V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
