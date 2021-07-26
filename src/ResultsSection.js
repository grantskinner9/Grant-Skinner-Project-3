import { useState, useEffect } from 'react';

const ResultsSection = ({albumResults, addAlbumToCart}) => {

  const [albumDisplay, setAlbumDisplay] = useState(4);

  const showMore = () => {
    setAlbumDisplay(albumDisplay + 4);
  }

  const albumsToBeDisplayed = albumResults.slice([0], albumDisplay);
  

  return(
    <section>
      <div className="wrapper">
        <ul>
          {
            albumsToBeDisplayed.map((results, index) => {
              const image = results.image[results.image.length-1]["#text"];
              const {name, artist} = results;
              return(
                <li key={index}>
                  <div className="imageContainer" onClick={ () => addAlbumToCart()}>
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