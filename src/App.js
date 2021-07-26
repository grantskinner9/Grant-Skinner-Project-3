import './styles/App.css';
import Header from './Header';
import ResultsSection from './ResultsSection';
import { useState } from 'react';

function App() {

  const [albumArray, setAlbumArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [displaySection, setDisplaySection] = useState(false);
  const [albumsInCart, setAlbumsInCart] = useState(0);

  const handleChange = (input) => {
    setUserInput(input);
  }

  const APICall = () => {
    const url = 'https://ws.audioscrobbler.com/2.0/';
    const apiKey = '93bd57c3a3ad6ee71989509b74af6577';

    fetch(`${url}?method=artist.gettopalbums&artist=${userInput}&api_key=${apiKey}&limit=20&format=json`)
      .then(res => res.json())
      .then(data => {
        data.topalbums.album.sort((a, b) => {
          return b.playcount - a.playcount
        });
        setAlbumArray(data.topalbums.album)
        setDisplaySection(true)
      })
    }

  const addAlbumToCart = () => {
    setAlbumsInCart(albumsInCart + 1);
  }

  return (
    <div className="App">
      <Header
        userInput={handleChange}
        inputValue={userInput}
        submitValue={APICall}
        albumsInCart={albumsInCart}
      />
      {
        displaySection ?
        <ResultsSection
        albumResults={albumArray}
        addAlbumToCart={addAlbumToCart}/> :
        null
      }

    </div>
  );
}

export default App;
