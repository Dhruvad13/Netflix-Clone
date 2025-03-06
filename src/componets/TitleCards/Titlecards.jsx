import React, { useEffect, useRef, useState } from 'react';
import './Titlecards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom'; 

const Titlecards = ({title,category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzRjZTM5MGUzMTBiOWM4YzMyMTFjNWY5YWZjMWRhNyIsIm5iZiI6MTc0MTA4NjM1NS40NDgsInN1YiI6IjY3YzZkZTkzMDExMWE4OGM2YjA0ZTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ymJS9UdB-_t8U56_ymG644Ao-Tg-YVGyUl4aFRXphUM'
    }
  };
  
  

  const handleWheel = (event) => {
    event.preventDefault(); 
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='titlecards'> 
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return  <Link to={`/Player/${card.id}`} className="card" key={index}>
            <img src={ 'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt={card.name} />
            <p>{card.original_title}</p>
            
          </Link>
          
        })}
      </div>
    </div>
  );
};

export default Titlecards;
