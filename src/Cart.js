import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ albumsInCart, setOpenCart, openCart, removeFromCart }) => {

  return(
    <div className="cart">
      <div className="cartContainer">
        <FontAwesomeIcon icon={faTimes} className="closeIcon" onClick={ () => setOpenCart(!openCart)} />
      </div>
      <div className="cartItems">
        <h2>Your Cart</h2>
        <ul className="albumList">
          {
            albumsInCart.map(albums => {
              return(
                <li key={albums.key} className="albumCartDisplay">
                  <div className="imageCartContainer" onClick={() => removeFromCart(albums.key)}>
                    <img src={albums.album.image} alt={albums.album.band} />
                    <p className="removeFromCart">Remove from Cart</p>
                  </div>
                  <p className="albumCartName">{albums.album.album}</p>
                  <p className="artistCartName">{albums.album.band}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Cart;

