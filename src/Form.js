const Form = ({userInput, inputValue, submitValue}) => {

  const submitUserValue = e => {
    e.preventDefault();
    submitValue();
  }

  return (
    <form
      action="#"
      method="#"
      className="myForm"
      name="myForm"
      onSubmit={submitUserValue}
    >

      <label htmlFor="recordSearch" className="sr-only">Search artist:</label>
      <input
        type="text"
        id="recordSearch"
        name="recordSearch"
        placeholder="Search Artist"
        required
        onChange={ (e) => userInput(e.target.value) }
        value={inputValue}
      />
          
      <button type="submit" className="button">Search</button>

    </form>
  )
}

export default Form