import { create } from 'zustand';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

interface ITodosState {
  todos: ITodo[];
  isLoading: boolean;
  addTodo: (title: string) => void;
  fetchTodos: () => void;
  removeTodo: (id: number) => void;
  completedTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
}

export const todoStore = create<ITodosState>((set, get) => ({
  todos: [],
  isLoading: false,
  addTodo: (title: string) => {
    const { todos } = get();
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    if (title) {
      const updatedTodos = [newTask, ...todos];
      set({ todos: updatedTodos });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  },
  fetchTodos: async () => {
    set({ isLoading: true });

    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (storedTodos.length > 0) {
      set({ todos: storedTodos, isLoading: false });
      return storedTodos;
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();

    localStorage.setItem('todos', JSON.stringify(todos));
    set({ todos: todos, isLoading: false });
  },
  removeTodo: (id) => {
    const updatedTodos = get().todos.filter(todo => todo.id !== id);

    set({ todos: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  completedTodo: (id) => {
    const updatedTodos = get().todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);

    set({ todos: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  },
  updateTodo: (id, newTitle) => {
    const updatedTodos = get().todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    set({ todos: updatedTodos });
  }
}));