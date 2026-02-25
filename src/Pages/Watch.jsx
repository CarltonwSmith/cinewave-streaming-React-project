import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Play, Plus, Check } from 'lucide-react';
import { mockMovies } from '../mock';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // Find movie by id
    const foundMovie = mockMovies.find(m => m.id === parseInt(id));
    setMovie(foundMovie);

    // Load myList
    const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(savedList);
  }, [id]);

  const handleToggleMyList = () => {
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

  const isInMyList = myList.some(item => item.id === movie?.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Close Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video Section */}
      <div className="relative w-full h-screen">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            <img
              src={movie.backdrop_path || movie.poster_path}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-white/30 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center hover:bg-white/50 transition transform hover:scale-110"
              >
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-[#E50914] rounded-full flex items-center justify-center animate-pulse">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </div>
              <p className="text-2xl mb-2">Playing: {movie.title || movie.name}</p>
              <p className="text-gray-400">Video player with YouTube trailer will load here</p>
              <button
                onClick={() => setIsPlaying(false)}
                className="mt-6 px-6 py-3 bg-[#E50914] rounded hover:bg-[#c11119] transition"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Movie Details */}
      <div className="px-4 md:px-12 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {movie.title || movie.name}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleToggleMyList}
              className={`flex items-center space-x-2 px-6 py-3 rounded transition ${
                isInMyList
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-[#E50914] hover:bg-[#c11119]'
              }`}
            >
              {isInMyList ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>In My List</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add to My List</span>
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {movie.overview}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Rating: </span>
                <span className="text-green-400 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
              </div>
              <div>
                <span className="text-gray-400">Release Year: </span>
                <span className="text-white">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Type: </span>
                <span className="text-white">
                  {movie.media_type === 'tv' ? 'TV Series' : 'Movie'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;