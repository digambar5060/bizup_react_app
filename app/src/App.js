
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searches, setSearches] = useState([]);
  const [justifyContent, setJustifyContent] = useState('flex-start'); // Initial value is 'flex-start'

  const fetchImages = async (query) => {
    try {
      const response = await axios.get(`https://source.unsplash.com/weekly?${query}&${Date.now()}`);
      const newSearch = { query, imageUrl: response.request.responseURL };
      setSearches([...searches, newSearch]);

      // Determine justify-content for next search
      switch (searches.length % 3) {
        case 0:
          setJustifyContent('flex-start');
          break;
        case 1:
          setJustifyContent('center');
          break;
        case 2:
          setJustifyContent('flex-end');
          break;
        default:
          setJustifyContent('flex-start');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const clearImages = () => {
    setSearches([]);
    setJustifyContent('flex-start'); // Reset justify-content to 'flex-start' when images are cleared
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Image Search</h1>
        <button className="clear-button" onClick={clearImages}>Clear All</button>
      </header>
      <div className="content">
        <form onSubmit={(e) => { e.preventDefault(); fetchImages(e.target.elements.query.value) }}>
          <input type="text" name="query" placeholder="Search images..." />
          <button type="submit">Search</button>
        </form>
        <div className="image-list" style={{ justifyContent: justifyContent }}>
          {searches.map((search, index) => (
            <div key={index} className="image-item">
              <img src={search.imageUrl} alt={`Image ${index}`} />
              <div className="image-details">
                <p>{search.query}</p>
                <a href={search.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
