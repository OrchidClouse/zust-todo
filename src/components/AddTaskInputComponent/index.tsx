import React, {useState, useCallback} from 'react'
import styles from './index.module.css'

interface AddTaskComponentProps {
  addTask: (title: string) => void 
}
const {taskInput, taskButton, controlElementsContainer} = styles

const AddTaskComponent: React.FC<AddTaskComponentProps> = ({addTask}) => {
  
  const [inputValue, setInputValue] = useState('')

  const addNewTask = useCallback(() => {
    addTask(inputValue)
    setInputValue('')

  }, [inputValue])

  return (
    <div className={controlElementsContainer}>
        <input
            className={taskInput}
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
            className={taskButton}
            onClick={addNewTask}
        >Add task</button>
          
    </div>
  )
}

export default AddTaskComponent