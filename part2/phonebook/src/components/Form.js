/* Form and Button components */

const Form = ({ submit, children, button }) => {
  return (
    <>
      <form onSubmit={submit}>
        {children}
        <Button text={button}/>
      </form>
    </>
  )
};

const Button = ({ text }) => {
  return (
        <div>
          <button type="submit">{text}</button>
        </div>
  )
};

export default Form;
