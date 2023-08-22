interface CheckboxInputProps {
  onChange: () => void;
  checked: boolean | undefined;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ onChange, checked }) => {
  return (
      <>
          <label htmlFor="completed">
              <input type='checkbox' name='completed' onChange={onChange} checked={checked} />
          </label>
      </>
  )
}

export default CheckboxInput