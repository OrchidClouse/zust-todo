import React, { useEffect } from 'react'
import { todoStore } from '../../store'
import AddTaskComponent from '../../components/AddTaskInputComponent'
import {Divider} from '../../components/shared-components/Divider'
import styles from './index.module.css'
import CheckboxInput from '../../components/CheckboxInput'

const {container, todoItems, todoItem, todoText, inputTodo} = styles

interface TodoContainerProps {
  mainTitle: string
}

const TodoContainer: React.FC<TodoContainerProps> = ({mainTitle}) => {
  
  const [todos, addTodo, fetchTodos, isLoading, removeTodo] = todoStore(state => [
    state.todos,
    state.addTodo,
    state.fetchTodos,
    state.isLoading,
    state.removeTodo
  ])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div>
      
      <h1 className='mainTitle'>{mainTitle}</h1>
      <Divider />
      <div className={container}>
        <AddTaskComponent addTask={addTodo}/>

        {isLoading ? "Loading..." : <div className={todoItems}>
          {todos.map(todo => (
            
            <div className={todoItem} key={todo.id}>
              <div className={inputTodo}>
                <CheckboxInput />
              </div>
              <div className={todoText}>
                {todo.title}
              </div>
              
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          ))}
        </div>}
      </div>

    </div>
  )
}

export default TodoContainer
