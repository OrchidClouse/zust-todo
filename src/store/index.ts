import {create} from 'zustand'
// import {immer} from 'zustand/middleware/immer'


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
} 

export const todoStore = create<ITodosState>((set, get) => ({
    todos: [],
    isLoading: true,
    addTodo: (title: string) => {
        const {todos} = get()
        const newTask = {
            id: Date.now(),
            title
        }
        if(title){
            const updatedTodos = [newTask].concat(todos);
            set({todos: updatedTodos})
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    },
    fetchTodos: async (): Promise<any> => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            set({todos: JSON.parse(storedTodos)});
        } else {
            const result = await fetch('https://jsonplaceholder.typicode.com/todos')
            const json = await result.json() as ITodo[];
            set({todos: json})
            localStorage.setItem('todos', JSON.stringify(json));
        }
        set({isLoading: false})
    },
    removeTodo: (id: number) => {
        const {todos} = get()
        const updatedTodos = todos.filter(todo => todo.id !== id);
        set({todos: updatedTodos})
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    completedTodo: (id: number) => {
        const {todos} = get()
        const updatedTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        set({todos: updatedTodos})
        localStorage.setItem('completed', JSON.stringify(updatedTodos));

    }
}))