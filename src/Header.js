import Form from './Form';
import Cart from './Cart';
import { useState } from 'react';

const Header = ({userInput, inputValue, submitValue, numberOfAlbumsInCart, albumsInCart}) => {

  const [ openCart, setOpenCart ] = useState(false);

  return (
    <header>
      <div className="cartPosition">
        <div className="cartFlex" onClick={ () => {setOpenCart(!openCart)}}>
          <i className="fas fa-shopping-cart"></i>
          <p className="counter">{numberOfAlbumsInCart}</p>
        </div>
        {
          openCart ?
          <Cart
          albumsInCart={albumsInCart}
          setOpenCart={setOpenCart}
          openCart={openCart}/> :
          null
        }
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