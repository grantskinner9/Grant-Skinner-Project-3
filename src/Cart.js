const Cart = ({ albumsInCart, setOpenCart, openCart }) => {

  return(
    <div className="cart">
      <div className="cartContainer">
        <i className="fas fa-times closeIcon" onClick={ () => setOpenCart(!openCart)}></i>
      </div>
      <div className="cartItems">
        <h2>Your Cart</h2>
        <ul>
          {
            albumsInCart.map(albums => {
              console.log(albums.key)
              return(
                <div key={albums.key} className="albumCartDisplay">
                  <img src={albums.album.image} alt={albums.album.band} />
                  <p className="albumCartName">{albums.album.album}</p>
                  <p className="artistCartName">{albums.album.band}</p>
                </div>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Cart;

