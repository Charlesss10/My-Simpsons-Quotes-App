// Importing necessary modules
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';

// Loading component
const Loading = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
      <h2>Loading...</h2>
      {/* You can replace this with your preferred loading animation */}
    </div>
  );
};

// Main App component
function App() {
// State variables
const [quotes, setQuotes] = useState([]);
const [searchTermCharacter, setSearchTermCharacter] = useState('');
const [searchTermQuote, setSearchTermQuote] = useState('');
const [selectedQuote, setSelectedQuote] = useState(null);
const [quotesFetched, setQuotesFetched] = useState(false); // State to track if quotes are fetched

// Fetch quotes from API only once when component mounts
useEffect(() => {
  if (!quotesFetched) {
    fetchQuotes();
    setQuotesFetched(true); // Update state to indicate quotes are fetched
  }
}, [quotesFetched]);

// Function to fetch quotes from API
const fetchQuotes = async () => {
  try {
    const response = await axios.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=20');
    setQuotes(response.data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};
 
  // Function to handle search term change for character
  const handleSearchChangeCharacter = (event) => {
    setSearchTermCharacter(event.target.value);
  };

  // Function to handle search term change for quote
  const handleSearchChangeQuote = (event) => {
    setSearchTermQuote(event.target.value);
  };

  // Filter quotes based on search term for character and quote
  const filteredQuotes = quotes.filter((quoteData) =>
  quoteData.character.toLowerCase().includes(searchTermCharacter.toLowerCase()) &&
  quoteData.quote.toLowerCase().includes(searchTermQuote.toLowerCase())
  );

  // Function to handle click on a quote to view full quote
  const handleViewFullQuote = (quoteData) => {
    setSelectedQuote(quoteData);
  };

  // Function to handle closing full quote view
  const handleCloseFullQuote = () => {
    setSelectedQuote(null);
  };

  // Function to share quote
  const handleShareQuote = (quoteData) => {
    const shareText = `"${quoteData.quote}" - ${quoteData.character}`;
    if (navigator.share) {
      navigator.share({
        title: 'Simpsons Quote',
        text: shareText
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      alert('You can share the quote by copying the text: ' + shareText);
    }
  };

  return (
    
    <div style={{ textAlign: 'center', position: 'absolute', width: '100%', top: '20px', backgroundColor: 'white' }}>
      <h1 style={{ fontFamily: 'Cursive', fontSize: '50px', fontWeight: 'bold', color: 'black' }}>Simpsons Quotes</h1>

      {/* Search input & Search bar*/}
      {/*JSX for search input for Character*/}
      <div style={{ marginBottom: '20px' }}> {/* Container for character search */}
        <input
          type="text"
          value={searchTermCharacter}
          onChange={handleSearchChangeCharacter}
          placeholder="Search by Character"
          style={{border: 'none', outline: 'none', borderRadius: '20px', padding: '10px',
          fontSize: '13px', marginBottom: '-5px', width: '400px', backgroundColor: '#F5F5F5', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
        />
      </div>

      {/*JSX for search input for Quote*/}
      <div style={{ marginBottom: '20px' }}> {/* Container for quote search */}
       <input
          type="text"
          value={searchTermQuote}
          onChange={handleSearchChangeQuote}
          placeholder="Search by Quote"
          style={{border: 'none', outline: 'none', borderRadius: '20px', padding: '10px', 
          fontSize: '13px', marginBottom: '-6px', width: '400px', backgroundColor: '#F5F5F5', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
        />
      </div>

      {/* Displaying Character Image, Quotes & Character Name */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', justifyContent: 'center', padding: '150px' }}>
        {filteredQuotes.map((quoteData, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <p style={{fontSize: '14px', lineHeight: '1.2' }}>{quoteData.character}</p>
            <img src={quoteData.image} alt={quoteData.character} style={{ width: '30%', height: 'auto', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <div style={{ padding: '10px' }}>
              <p style={{ fontFamily: 'Cursive', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2', maxHeight: '60px', overflow: 'hidden' }}
              >{quoteData.quote.length > 50 ? quoteData.quote.slice(0, 40) + '...' : quoteData.quote}</p>

               {/* Buttons for viewing full quote and sharing */}
              <Button style={{ marginRight: '10px', fontSize: '9px', backgroundColor: 'white', 
               boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', color: 'black' }} onClick={() => handleViewFullQuote(quoteData)}>View Full Quote</Button>
              <Button style={{backgroundColor: 'white', 
               boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', color: 'black' }} onClick={() => handleShareQuote(quoteData)} 
               startIcon={<ShareIcon style={{ fontSize: '16px' }}/>}></Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying full quote */}
      {selectedQuote && (
        <div style={{fontFamily: 'Cursive', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', 
          padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
            <p style={{ fontFamily: 'Cursive', marginBottom: '5px', fontSize: '20px', fontWeight: 'bold' }}>{selectedQuote.quote}</p>
            <p style={{ fontFamily: 'Arial', fontWeight: 'normal', fontSize: '15px' }}>{selectedQuote.character}</p>
            <Button style={{fontSize: '9px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
            backgroundColor: 'white', color: 'black'}} onClick={handleCloseFullQuote}>Close</Button>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;