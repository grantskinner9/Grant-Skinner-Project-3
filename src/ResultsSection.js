const ResultsSection = ({albumResults, addAlbumToCart, albumDisplay, showMore}) => {


  const albumsToBeDisplayed = albumResults.slice([0], albumDisplay);
  

  return(
    <section>
      <div className="wrapper">
        <ul className="albumList">
          {
            albumsToBeDisplayed.map((results, index) => {
              const image = results.image[results.image.length-1]["#text"];
              const { name, artist } = results;
              return(
                <li key={index} className="artistResults">
                  <div
                  className="imageContainer"
                  onClick={ () => addAlbumToCart(name, artist.name, image)}>
                    <img src={image} alt={name} />
                    <p className="addToCart">Add to cart</p>
                  </div>
                  <p className="albumName">{name}</p>
                  <p className="artistName">{artist.name}</p>
                </li>
              )
            })
          }
        </ul>
        <button onClick={showMore}>Show More</button>
      </div>
    </section>
  )
}

export default ResultsSection;