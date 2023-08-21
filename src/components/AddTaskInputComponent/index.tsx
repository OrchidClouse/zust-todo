import React, {useState, useCallback} from 'react'


interface AddTaskComponentProps {
  addTask: (title: string) => void 
}


const AddTaskComponent: React.FC<AddTaskComponentProps> = ({addTask}) => {
  
  const [inputValue, setInputValue] = useState('')

  const addNewTask = useCallback(() => {
    addTask(inputValue)
    setInputValue('')

  }, [inputValue])

  return (
    <div className='flex'>
        <input
            className=" h-9 w-1/3 border rounded-lg pl-3 font-bold"
            type='text'
            onChange={(event) => {setInputValue(event.target.value)}}
            onKeyDown={(event) => {
              if(event.key === 'Enter'){
                addNewTask()
              }
            }}
            value={inputValue}
            placeholder='Write...'
        />
        <button 
            className=" border rounded-lg w-28 h-[35px] ml-1 bg-emerald-50"
            onClick={addNewTask}
        >Add task</button>
          
    </div>
  )
}

export default AddTaskComponent