const Cart = ({ albumsInCart, setOpenCart, openCart }) => {

  return(
    <div className="cart">
      <h2>Your Cart</h2>
      <i className="fas fa-times" onClick={ () => setOpenCart(!openCart)}></i>
      <ul>
        {
          albumsInCart.map((albums, index) => {
            console.log(albums.album)
            return(
              <div key={index}>
                <p>{albums.album.band}</p>
                <p>{albums.album.album}</p>
                <img src={albums.album.image} alt={albums.album.band} />
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Cart;

