import { ITodo } from "store"
import React from 'react'
import {TodoItem} from 'components'


export interface ITodoContainerProps {
	todos: ITodo[]
}

export const TodoContainer: React.FC<ITodoContainerProps> = ({todos}) => {

	return(
		<>
			{todos && todos.map((todo) => (
				<TodoItem todo={todo}/>
			))}
		</>
	)
}
