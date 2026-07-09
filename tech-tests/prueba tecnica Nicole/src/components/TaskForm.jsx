function TaskForm({ taskText, taskError, setTaskText, handleAddTask }) {
  return (
    <form className="task-form" onSubmit={handleAddTask} noValidate>
      <div className="task-form-row">
        <div className="task-input-group">
          <input
            type="text"
            placeholder="Escribe una nueva tarea..."
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            aria-invalid={taskError !== ''}
            aria-describedby={taskError !== '' ? 'task-error' : undefined}
          />
        </div>

        <button type="submit">
          Agregar
        </button>
      </div>

      {taskError !== '' && (
        <p className="task-error" id="task-error" role="alert">
          {taskError}
        </p>
      )}
    </form>
  )
}

export default TaskForm
