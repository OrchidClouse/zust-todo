import { create } from 'zustand';

export interface ITodo {
  id: number;
  title: string;
  completed?: boolean;
}

interface ITodosState {
  todos: ITodo[];
  isLoading: boolean;
  addTodo: (title: string) => void;
  fetchTodos: () => Promise<ITodo[]>;
  removeTodo: (id: number) => void;
  completedTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
  onDragEnd: (result: any) => void
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
    };
    if (title) {
      const updatedTodos = [newTask, ...todos];
      set({ todos: updatedTodos });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  },
  fetchTodos: async (): Promise<any> => {
    const storedTodos = localStorage.getItem('todos');
    set({isLoading: true})
    if (storedTodos) {
      set({ todos: JSON.parse(storedTodos) });
    } else {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos');
      const json = await result.json() as ITodo[];
      set({ todos: json });
      localStorage.setItem('todos', JSON.stringify(json));
    }

    set({ isLoading: false });
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
  },
  onDragEnd: (result) => {
    const {todos} = get()
    if (!result.destination) {
      return;
    }

    const items = Array.from(todos);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);

    set({ todos: items });
  }
}));