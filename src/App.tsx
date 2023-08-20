import React from 'react';
// import {todoStore} from './store'
import './App.css';
import TodoContainer from './views/TodoMain';

function App() {
  // const todos = todoStore(state => state.todos)
  // const addTodo = todoStore(state => state.addTodo)
  // const fetchTodos = todoStore(state => state.fetchTodos)
  // const isLoading = todoStore(state => state.isLoading)

  // const btnHandler = () => {
  //   addTodo('Maksim')
  // }

  // const inputHandler = (e: Event) => {
  //   console.log(e.target)
  // }

  // useEffect(() => {
  //   fetchTodos()
  // },[])

  // if(isLoading){
  //  return <div>Loading...</div>
  // }

  return (
    <div className="App">
      <TodoContainer mainTitle='Todo App'/>
    </div>
    
    );
}

export default App;
