import './styles/App.css';
import Header from './Header';
import ResultsSection from './ResultsSection';
import { useState, useEffect } from 'react';
import firebase from './firebase';

function App() {

  const [albumArray, setAlbumArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [displaySection, setDisplaySection] = useState(false);
  const [numberOfAlbumsInCart, setNumberOfAlbumsInCart] = useState(0);
  const [albumsInCart, setAlbumsInCart] = useState([]);
  const [albumDisplay, setAlbumDisplay] = useState(4);

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
      setAlbumsInCart(toBeSetInState)
    })
  }, [])

  const handleChange = (input) => {
    setUserInput(input);
  }

  const APICall = () => {
    const url = 'https://ws.audioscrobbler.com/2.0/';
    const apiKey = '93bd57c3a3ad6ee71989509b74af6577';

    fetch(`${url}?method=artist.gettopalbums&artist=${userInput}&api_key=${apiKey}&limit=16&format=json`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.topalbums.album.sort((a, b) => {
          return b.playcount - a.playcount
        });
        setAlbumArray(data.topalbums.album)
        setDisplaySection(true)
        setAlbumDisplay(4)
      })
    }

  const addAlbumToCart = () => {
    setNumberOfAlbumsInCart(numberOfAlbumsInCart + 1);
  }

  const showMore = () => {
    setAlbumDisplay(albumDisplay + 4);
  }

  return (
    <div className="App">
      <Header
        userInput={handleChange}
        inputValue={userInput}
        submitValue={APICall}
        numberOfAlbumsInCart={numberOfAlbumsInCart}
        albumsInCart={albumsInCart}
      />
      {
        displaySection ?
        <ResultsSection
        albumResults={albumArray}
        addAlbumToCart={addAlbumToCart}
        albumDisplay={albumDisplay}
        showMore={showMore}/> :
        null
      }

    </div>
  );
}

export default App;
