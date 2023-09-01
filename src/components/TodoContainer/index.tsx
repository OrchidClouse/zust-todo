import { ITodo } from "store"
import React from 'react'
import {TodoItem} from 'components'
import { Droppable } from "react-beautiful-dnd"


export interface ITodoContainerProps {
	todos?: ITodo[]
}

export const TodoContainer: React.FC<ITodoContainerProps> = ({todos}) => {

	return(
		// <>
		// 	{todos && todos.length > 0 && todos.map((todo) => (
		// 		<TodoItem todo={todo}/>
		// 	))}
		// </>
		<Droppable droppableId="droppable">
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
				{todos && todos.map((todo, index) => (
					<TodoItem key={todo.id} todo={todo} index={index} />
				))}
				{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}
