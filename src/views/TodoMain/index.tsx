import React, { useEffect} from 'react'
import { todoStore } from '../../store'
import { Divider, AddTaskComponent, TodoWrapper } from '../../components'


interface IContainerComponentProps {
  mainTitle: string
}

const ContainerComponent: React.FC<IContainerComponentProps> = ({mainTitle}) => {
  const {todos, fetchTodos, addTodo, isLoading} = todoStore(state => state)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div>
      <h1 className='font-bold text-2xl mb-10 text-center'>{mainTitle}</h1>
      <Divider />
      <div className="m-auto border-[15px] border-white-500 w-1/2 min-h-[200px] p-3 rounded-lg overflow-clip">
        <AddTaskComponent addTask={addTodo}/> 
        <div className='cursor-pointer border w-fit rounded' title={`Total todos: ${todos.length}`}>
          tooltip
        </div>
        {isLoading ? "Loading..." : 
          <div className="flex justify-between">
              <TodoWrapper todos={incompleteTodos} todoStatus={"incomplete"} />
              <TodoWrapper todos={completedTodos} todoStatus={"complete"} />
          </div>
        }
      </div>
    </div>
  )
}

export default ContainerComponent
