import './NewTaskList.css'
import { useState } from 'react'
import api from '../../utils/api.utils'

function NewTaskList(props) {
  const { tasks, shouldRefresh } = props

  const handleChange = (event, id) => {
    const newStatus = event.target.checked
    updateTaskStatus(id, newStatus)
  }

  const updateTaskStatus = async (id, status) => {
    try {
      const newStatus = { id: id, status: status }
      await api.post(`/tasks/${id}`, newStatus)
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.status ? 'completed-task' : 'incomplete-task'}
          >
            <input
              type="checkbox"
              checked={task.status}
              onChange={(event) => handleChange(event, task.id)}
            />
            {task.title} <button>...</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewTaskList