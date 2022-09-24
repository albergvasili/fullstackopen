const Input = ({ label, value, onChange }) => {
  return (
        <div>
          <label>
            {label}
            <input value={value} onChange={onChange} />
          </label>
        </div>
  )
};

export default Input;
