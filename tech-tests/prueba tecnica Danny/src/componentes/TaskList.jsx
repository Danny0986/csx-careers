function TaskList({ tasks, deleteTask, toggleTask }) {
  return (
    <div className="grid">
      {tasks.map(task => (
        <div className="card" key={task.id}>
          <span
            className={task.completed ? "completada" : ""}
            onClick={() => toggleTask(task.id)}
            style={{ cursor: "pointer" }}
          >
            {task.text}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}