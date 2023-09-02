import { ITodo } from "store";
import { todoStore } from '../../store';
import { CheckboxInput } from 'components';
import { useState } from "react";

interface ITodoItemProps {
  todo: ITodo;
}

export const TodoItem: React.FC<ITodoItemProps> = ({ todo}) => {
  const { completedTodo, updateTodo, removeTodo } = todoStore(store => store);
  const [editingTodo, setEditingTodo] = useState<null | number>(null);


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const form = e.currentTarget.form;
      if (form) {
        const index = Array.prototype.indexOf.call(form, e.currentTarget);
        const nextElement = form.elements[index + 1] as HTMLInputElement;
        if (nextElement) {
          nextElement.focus();
        }
      }

      e.preventDefault();
      setEditingTodo(null);
    }
  };

  return (
	<>
		<div
		className="flex items-center text-center border shadow rounded m-2 p-2 max-w-lg w-11/12 flex-wrap"
		key={todo.id}
		>
		<div className="mr-3">
			<CheckboxInput onChange={() => { completedTodo(todo.id) }} checked={todo.completed} todo={todo} />
		</div>
		{editingTodo === todo.id ? (
			<input
			className="flex-1 break-all p-2"
			type="text"
			value={todo.title}
			onChange={(e) => updateTodo(todo.id, e.target.value)}
			onBlur={() => setEditingTodo(null)}
			onKeyDown={handleEnter}
			autoFocus
			/>
		) : (
			<div className="flex-1 break-all p-2" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} onClick={() => setEditingTodo(todo.id)}>
			{todo.title}
			</div>
		)}
		<button
			className='transition ease-in-out hover:-translate-y-1 border rounded ml-2 bg-red-500 text-white hover:bg-red-700'
			onClick={() => removeTodo(todo.id)}
		>
			Remove
		</button>
		</div>
	</>
  );
};