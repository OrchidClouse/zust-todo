import {create} from 'zustand'
// import {immer} from 'zustand/middleware/immer'


export interface ITodo {
    id: number;
    title: string;
}

interface TodosState {
    todos: ITodo[];
    isLoading: boolean;
    addTodo: (title: string) => void;
    fetchTodos: () => Promise<ITodo[]>;
    removeTodo: (id: number) => void
    
} 
 
export const todoStore = create<TodosState>((set, get) => ({
    todos: [],
    isLoading: true,
    addTodo: (title: string) => {
        const {todos} = get()
        const newTask = {
            id: Date.now(),
            title
        }
        set({todos: [newTask].concat(todos)})
    },
    fetchTodos: async (): Promise<any> => {
        const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        const json = await result.json() as ITodo[];
        set({todos: json})
        set({isLoading: false})
    },
    removeTodo: (id: number) => {
        const {todos} = get()
        set({todos: todos.filter(todo => todo.id !== id)})
        
    }


}))