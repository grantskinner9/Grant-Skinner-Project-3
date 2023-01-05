const ResultsSection = ({albumResults, addAlbumToCart, albumDisplay, showMore, initAlbums, displaySection}) => {

  // We use .slice() to create a new array, with only the number of albums I want displayed at a time.  Used .slice() as it returns a new array, and doesn't alter state.  albumDisplay is pased in as second parameted, so when a user clicks Show More button, albumDisplay will increase by 4 at a time.
  const albumsToBeDisplayed = albumResults.slice([0], albumDisplay);

  return(
    <section className="albumSection">
      <div className="wrapper">
        {
        displaySection ?
        <h2 className="featured">Searched Albums</h2> :
        <h2 className="featured">Featured Albums</h2>
        }
        <ul className="albumList">
          {
            displaySection ? 
            albumsToBeDisplayed.map((results, index) => {
              const image = results.image[results.image.length-1]["#text"];
              const { name, artist, prices } = results;
              return(
                <li key={index} className="artistResults">
                  <div
                  className="imageContainer"
                  onClick={ () => addAlbumToCart(name, artist.name, image, prices)}>
                    <img src={image} alt={name} />
                    <p className="addToCart">Add to cart</p>
                    <i class="far fa-heart"></i>
                  </div>
                  <p className="albumName">{name}</p>
                  <p className="artistName">{artist.name}</p>
                  <p className="price">${prices}</p>
                </li>
              )
            }):
            initAlbums.map((results, index) => {
              const image = results.image[results.image.length-1]["#text"];
              const { name, artist, prices } = results;
              return(   
                <li key={index} className="artistResults">
                  <div 
                  className="imageContainer"
                  onClick={ () => addAlbumToCart(name, artist.name, image, prices)}>
                    <img src={image} alt={name} />
                    <p className="addToCart">Add to cart</p>
                    <i class="far fa-heart"></i>
                  </div>
                  <p className="albumName">{name}</p>
                  <p className="artistName">{artist.name}</p>
                  <p className="price">${prices}</p>
                </li>
              )
            })
          }
        </ul>
        <div className="showMore">
          <button onClick={showMore}>Show More</button>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection;