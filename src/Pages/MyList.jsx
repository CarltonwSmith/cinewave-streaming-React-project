import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Film } from 'lucide-react';

const MyList = () => {
  const navigate = useNavigate();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(savedList);
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/watch/${movie.id}`);
  };

  const handleToggleMyList = (movie) => {
    const updatedList = myList.filter(item => item.id !== movie.id);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-4 md:px-12">
      <div className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-semibold mb-2">My List</h1>
        <p className="text-gray-400">
          {myList.length} {myList.length === 1 ? 'title' : 'titles'}
        </p>
      </div>

      {myList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {myList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
              isInMyList={true}
              onToggleMyList={handleToggleMyList}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-xl">Your list is empty</p>
          <p className="text-gray-500 mt-2">Add movies and shows to watch later</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-8 py-3 bg-[#E50914] text-white rounded hover:bg-[#c11119] transition font-semibold"
          >
            Browse Content
          </button>
        </div>
      )}
    </div>
  );
};

export default MyList;