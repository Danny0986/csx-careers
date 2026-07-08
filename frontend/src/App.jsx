import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import UsersSection from './components/UsersSection'
import chicaImage from './assets/chica.jpg'
import './App.css'

function App() {
  const [taskText, setTaskText] = useState('')
  const [taskError, setTaskError] = useState('')
  const [tasks, setTasks] = useState([])

  function handleAddTask(event) {
    event.preventDefault()

    if (taskText.trim() === '') {
      setTaskError('Debes escribir una tarea antes de agregarla.')
      return
    }

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTaskText('')
    setTaskError('')
  }

  function handleTaskTextChange(value) {
    setTaskText(value)

    if (taskError !== '') {
      setTaskError('')
    }
  }

  function handleToggleTask(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function handleDeleteTask(taskId) {
    const filteredTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(filteredTasks)
  }

  return (
    <main className="app">
      <section className="todo-section">
        <div className="today-card">
          <div>
            <h1>Lista de Tareas</h1>
            <p>Organiza tus pendientes, marca tus avances y manten tu dia en orden</p>
          </div>

          <div className="today-visual" aria-hidden="true">
            <img src={chicaImage} alt="" />
          </div>
        </div>

        <div className="tasks-container">
          <TaskForm
            taskText={taskText}
            taskError={taskError}
            setTaskText={handleTaskTextChange}
            handleAddTask={handleAddTask}
          />

          <TaskList
            tasks={tasks}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>

        <UsersSection />
      </section>
    </main>
  )
}

export default App
