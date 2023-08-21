import React from 'react'

const CheckboxInput: React.FC = () => {
  return (
    <>
      <label htmlFor="completed">
        <input type='checkbox' name='completed' />
      </label>
    </>
  )
}

export default CheckboxInput
