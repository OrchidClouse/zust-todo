import { TodoContainer } from "components"
import { ITodo } from "store";
import React from "react";


interface ITodoWrapper {
	todos: ITodo[];
	todoStatus: 'complete' | 'incomplete'
}

export const TodoWrapper: React.FC<ITodoWrapper> = ({todos, todoStatus}) => {

	return(
		<div className="m-2">
			<div className=" ml-5">
				<h2 className="font-bold text-xl">{todoStatus === 'complete' ? "Complete" : "Incomplete"} Tasks</h2>
				<h4>Total: {todos.length}</h4>
			</div>
			<div className='flex flex-col items-center border rounded'>
				<TodoContainer todos={todos}/>
			</div>
	  	</div>
	)
} 