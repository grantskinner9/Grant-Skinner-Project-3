import './styles/App.css';
import Header from './Header';
import ResultsSection from './ResultsSection';
import prices from './prices';
import { useState, useEffect } from 'react';
import firebase from './firebase';

function App() {

  const [albumArray, setAlbumArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [displaySection, setDisplaySection] = useState(false);
  const [numberOfAlbumsInCart, setNumberOfAlbumsInCart] = useState(0);
  const [albumsInCart, setAlbumsInCart] = useState([]);
  const [albumDisplay, setAlbumDisplay] = useState(4);
  const [cartTotal, setCartTotal] = useState(0)

  // useEffect mounts on pageload.  It retrieves reference of firebase database.  I loop through the recieved firebase data and push it into an array of objects called toBeSetInState.  I then loop through the toBeSetInState array and tally up the price value in each object which gets set as cartTotal.  I set the price total to state with setPriceTotal, which I am also using .toFixed(2) on so it only gives me the first 2 deminal points in the price total.  This number gets displayed in the cart.  I set my toBeSetInState array of object into state using setAlbumsInCart.  These are the albums that get displayed into the cart .  I lastly set the setNumberOfAlbumsInCart state to my array length, so that the number on the cart knows how many items are in the cart
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const myData = response.val();
      const toBeSetInState = [];

      for(let key in myData) {
        const albumObject = {
          key: key,
          album: myData[key]
        }
        toBeSetInState.push(albumObject)
      }

      let cartTotal = 0;
      toBeSetInState.forEach(arr => {
        cartTotal = cartTotal + arr.album.price
      })

      setCartTotal(cartTotal.toFixed(2))
      setAlbumsInCart(toBeSetInState)
      setNumberOfAlbumsInCart(toBeSetInState.length)
    })
  }, [])

  //This function gets passed down through <Header />, and then through to <Form /> as a prop.  It handles the users typed input and sets it into state through setUserInput
  const handleChange = (input) => {
    setUserInput(input);
  }

  //This handles API call to lastfm database.  It is passed down as a prop through <Header /> and into <Form />, and is fired on submit.  It grabs the userInput in state, and runs the API.  I put in a .catch() to handle API error to display a message to the user.  If the call is successful I run the recieved data through a .sort() method so that it sorts the array by highest playcount (this should theoretically display the most popular albums first).  I then loop through the sorted array and set a random price to each album.  I did this by creating an array of 4 price options in prices.js which I import into my App.js, which then is used to find a random price in that array.  I then run a .filter() method on my sorted array, to only return albums with photos in them.  I set the sorted albums WITH images into state with setAlbumArray.  I setDisplaySection to true, which I use to then show <ResultsSection /> with a ternary operator in my return() jsx.  Lastly, I setAlbumDisplay to 4, which what I use to only show the first 4 array items on submit 
  const APICall = () => {
    const url = 'https://ws.audioscrobbler.com/2.0/';
    const apiKey = '93bd57c3a3ad6ee71989509b74af6577';

    fetch(`${url}?method=artist.gettopalbums&artist=${userInput}&api_key=${apiKey}&limit=16&format=json`)
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(data => {

      const albumsSorted = data.topalbums.album.sort((a, b) => {
        return b.playcount - a.playcount
      });

      albumsSorted.forEach(album => {
        album.prices = prices[Math.floor(Math.random() * prices.length)];
      })

      const albumsWithImage = albumsSorted.filter(album => {
        return album.image[0]["#text"];
      });

      setAlbumArray(albumsWithImage)
      setDisplaySection(true)
      setAlbumDisplay(4)
    })
    .catch(err => {
      console.log(err)
      if (err.message === "Not Found") {
        alert("We couldn't find this artist at this time.  Try again later.")
      } else {
        alert("Something went wrong.  Try again later.")
      }
    })
  }

  // This is set through as a prop to <ResultsSection />.  This function fires when a user clicks an album cover from the results section.  It takes info of the album as parameters and sorts it into an object.  This object then gets push into firebase.
  const addAlbumToCart = (albumName, artistName, albumArt, prices) => {
    const artistObj = {
      album: albumName,
      band: artistName,
      image: albumArt,
      price: prices
    }
    const dbRef = firebase.database().ref();
    dbRef.push(artistObj);
  }

  // This is passed as a prop to <ResultsSection />.  This function fires when a user clicks on the Show More button.  It sets albumDisplay by 4, so that on each click, the user will see 4 more options.
  const showMore = () => {
    setAlbumDisplay(albumDisplay + 4);
  }

  // This is passed as a prop through <Header /> to <Cart />.  It fires when a user has clicked on an album in the cart to remove.  I grabs the key from the album, and uses that to remove it from firebase
  const removeFromCart = (key) => {
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();
  }

  return (
    <div className="App">
      <Header
        userInput={handleChange}
        inputValue={userInput}
        submitValue={APICall}
        numberOfAlbumsInCart={numberOfAlbumsInCart}
        albumsInCart={albumsInCart}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
      />
      {
        displaySection ?
        <ResultsSection
        albumResults={albumArray}
        addAlbumToCart={addAlbumToCart}
        albumDisplay={albumDisplay}
        showMore={showMore}
        /> :
        null
      }

    </div>
  );
}

export default App;
