import Form from './Form';
import Cart from './Cart';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Header = ({userInput, inputValue, submitValue, numberOfAlbumsInCart, albumsInCart, removeFromCart, cartTotal}) => {

  const [ openCart, setOpenCart ] = useState(false);

  return (
    <header>
      <div className="cartPosition">
        <div className="cartFlex" onClick={ () => {setOpenCart(!openCart)}}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <p className="counter">{numberOfAlbumsInCart}</p>
        </div>
        {
          openCart ?
          <Cart
          albumsInCart={albumsInCart}
          setOpenCart={setOpenCart}
          openCart={openCart}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}/> :
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