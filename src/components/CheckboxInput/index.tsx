import { ITodo } from "store";

interface ICheckboxInputProps {
  onChange: () => void;
  checked: boolean | undefined;
  todo: Pick<ITodo, "id">
}

export const CheckboxInput: React.FC<ICheckboxInputProps> = ({ onChange, checked, todo }) => (
  <label htmlFor={`todo-${todo.id}`} className="flex items-center cursor-pointer">
    <div className={`w-5 h-5 border border-gray-500 rounded-md ${checked ? 'bg-blue-500' : ''} relative`}>
      <input 
        id={`todo-${todo.id}`} 
        type='checkbox' 
        name='completed' 
        onChange={onChange} 
        checked={checked} 
        className="appearance-none w-full h-full absolute top-0 left-0 cursor-pointer"
      />
      {checked && <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>}
    </div>
  </label>
)