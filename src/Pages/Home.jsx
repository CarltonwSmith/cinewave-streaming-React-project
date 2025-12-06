import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { mockMovies, mockCategories } from '../mock';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Load featured movie
    setFeaturedMovie(mockMovies[0]);
    
    // Load user's list from localStorage
    const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(savedList);
  }, [navigate]);

  const handleMovieClick = (movie) => {
    navigate(`/watch/${movie.id}`);
  };

  const handlePlayClick = () => {
    if (featuredMovie) {
      navigate(`/watch/${featuredMovie.id}`);
    }
  };

  const handleToggleMyList = (movie) => {
    const isInList = myList.some(item => item.id === movie.id);
    let updatedList;
    
    if (isInList) {
      updatedList = myList.filter(item => item.id !== movie.id);
    } else {
      updatedList = [...myList, movie];
    }
    
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  const isInMyList = (movie) => {
    return myList.some(item => item.id === movie.id);
  };

  return (
    <div className="bg-[#141414] min-h-screen">
      <HeroBanner
        movie={featuredMovie}
        onPlayClick={handlePlayClick}
        isInMyList={featuredMovie ? isInMyList(featuredMovie) : false}
        onToggleMyList={handleToggleMyList}
      />
      
      <div className="relative -mt-32 z-10">
        {mockCategories.map((category) => (
          <MovieRow
            key={category.id}
            title={category.title}
            movies={category.movies}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;