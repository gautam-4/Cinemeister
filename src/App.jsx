import { useState, useEffect } from 'react'
import searchIcon from './assets/search.svg'
import MovieCard from './components/MovieCard';
import './main.css'

function App() {

  const API_URL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&`

  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState();

  async function searchMovies(title) {
    try {
      const response = await fetch(`${API_URL}s='${title}'`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleSearch(){
    searchMovies(searchItem);
  }

  function handleSearchChange(e){
    setSearchItem(e.target.value)
  }
  

  useEffect( () => {
    searchMovies('avengers')
  }, []);


  return (
    <>
      <div className="app">
        <div className="header">
          <div id='logo' className='title'>Cinemeister</div>

          <div className="search">
            <input type="text" placeholder='search for movies' onChange={handleSearchChange}/>
            <img src={searchIcon} alt="search" onClick={handleSearch}/>
          </div>

        </div>

        <div className="container">
          {
            movies && movies.length > 0?(
            movies.map((movie, index) => {
              return <MovieCard movie={movie} key={index}/>
            })
            ):(
              <h2>Does not match any search results</h2>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App