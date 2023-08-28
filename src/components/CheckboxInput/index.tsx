interface ICheckboxInputProps {
  onChange: () => void;
  checked: boolean | undefined;
}

export const CheckboxInput: React.FC<ICheckboxInputProps> = ({ onChange, checked }) => (
  <label htmlFor="completed">
    <input type='checkbox' name='completed' onChange={onChange} checked={checked} />
  </label>
)
