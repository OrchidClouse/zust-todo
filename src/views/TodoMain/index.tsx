import React, { useEffect, useState } from 'react'
import { todoStore } from '../../store'
import { Divider, CheckboxInput, AddTaskComponent } from '../../components'

interface ITodoContainerProps {
  mainTitle: string
}

const TodoContainer: React.FC<ITodoContainerProps> = ({mainTitle}) => {
  const [editingTodo, setEditingTodo] = useState<null | number>(null);
  const {todos, addTodo, fetchTodos, isLoading, removeTodo, completedTodo, updateTodo} = todoStore(state => state)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const form = event.currentTarget.form;
      if (form) {
        const index = Array.prototype.indexOf.call(form, event.currentTarget);
        const nextElement = form.elements[index + 1] as HTMLInputElement;
        if (nextElement) {
          nextElement.focus();
        }
      }
      event.preventDefault();
      setEditingTodo(null);
    }
  }

  return (
    <div>
      
      <h1 className='font-bold text-2xl mb-10'>{mainTitle}</h1>
      <Divider />
      <div className="m-auto border-[20px] border-cyan-500 w-1/2 min-h-[200px] p-3 rounded-lg overflow-clip">
        <AddTaskComponent addTask={addTodo}/>

        {isLoading ? "Loading..." : <div className="flex justify-between pl-1 items-start flex-col">

          {Array.isArray(todos) && todos.length > 0 && todos.map(todo => (
            
            <div className="flex items-center text-center border shadow rounded m-2 p-2 w-2/4 flex-wrap" key={todo.id}>
              <div className="mr-3">
              <CheckboxInput onChange={(e) => {e.stopPropagation(); completedTodo(todo.id)}} checked={todo.completed} todo={todo}/>
              </div>
              {editingTodo === todo.id ? (
                <input
                  className="flex-1 break-all p-2"
                  type="text"
                  value={todo.title}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  onBlur={() => setEditingTodo(null)}
                  onKeyDown={handleEnter}
                  autoFocus
                />
              ) : (
                <div className="flex-1 break-all p-2" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} onClick={() => setEditingTodo(todo.id)}>
                  {todo.title}
                </div>
              )}
              <button 
              className='transition ease-in-out hover:-translate-y-1 border rounded ml-2 bg-red-500 text-white hover:bg-red-700'
              onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          ))}
        </div>}
      </div>

    </div>
  )
}

export default TodoContainer
