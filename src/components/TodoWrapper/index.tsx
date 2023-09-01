import { TodoContainer } from "components"
import { ITodo } from "store";
import React from "react";


interface ITodoWrapper {
	todos: ITodo[];
	todoType: 'complete' | 'incomplete'
}

export const TodoWrapper: React.FC<ITodoWrapper> = ({todos, todoType}) => {

	return(
		<div className="m-2">
			<div className=" ml-5">
			<h2 className="font-bold text-xl">{todoType === 'complete' ? "Complete" : "Incomplete"} Tasks</h2>
			<h4>Total: {todos.length}</h4>
			</div>
			<div className='flex flex-col-reverse items-center border rounded'>
				<TodoContainer todos={todos}/>
			</div>
	  	</div>
	)
} 