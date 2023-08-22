import React, { useEffect } from 'react'
import { todoStore } from '../../store'
import AddTaskComponent from '../../components/AddTaskInputComponent'
import {Divider} from '../../components/shared-components/Divider'
import CheckboxInput from '../../components/CheckboxInput'

interface TodoContainerProps {
  mainTitle: string
}

const TodoContainer: React.FC<TodoContainerProps> = ({mainTitle}) => {
  
  const [todos, addTodo, fetchTodos, isLoading, removeTodo, completedTodo] = todoStore(state => [
    state.todos,
    state.addTodo,
    state.fetchTodos,
    state.isLoading,
    state.removeTodo,
    state.completedTodo

  ])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div>
      
      <h1 className='font-bold text-2xl mb-10'>{mainTitle}</h1>
      <Divider />
      <div className="m-auto border-[20px] border-cyan-500 w-1/2 min-h-[200px] p-3 rounded-lg overflow-clip">
        <AddTaskComponent addTask={addTodo}/>

        {isLoading ? "Loading..." : <div className="flex justify-between pl-1 items-start flex-col">

          {todos.map(todo => (
            
            <div className="flex items-center text-start border rounded m-2 p-2 w-2/4 flex-wrap" key={todo.id}>

              <div className="mr-3">
                <CheckboxInput onChange={() => completedTodo(todo.id)} checked={todo.completed}/>
              </div>
              <div className="flex-1 break-all" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </div>
              
              <button 
              className='transition ease-in-out hover:-translate-y-px border rounded ml-2 bg-emerald-50'
              onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          ))}
        </div>}
      </div>

    </div>
  )
}

export default TodoContainer
