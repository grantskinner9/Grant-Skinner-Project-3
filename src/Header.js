import './styles/App.css';
import Form from './Form';

const Header = ({userInput, inputValue, submitValue, albumsInCart}) => {

  return (
    <header>
      <div className="cartPosition">
        <div className="cartFlex">
          <i className="fas fa-shopping-cart"></i>
          <p className="counter">{albumsInCart}</p>
        </div>
        <h1>Mountain<span>Records</span></h1>
        <Form
          userInput={userInput}
          inputValue={inputValue}
          submitValue={submitValue}
        />
      </div>
    </header>
  )
}


export default Header;