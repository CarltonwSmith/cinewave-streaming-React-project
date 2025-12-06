import React, { useState } from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';

const HeroBanner = ({ movie, onPlayClick, isInMyList, onToggleMyList }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!movie) return null;

  return (
    <div className="relative h-[85vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path || movie.poster_path}
          alt={movie.title || movie.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-12 pt-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title || movie.name}
          </h1>
          <p className="text-base md:text-lg text-white mb-6 line-clamp-3 drop-shadow-lg">
            {movie.overview}
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onPlayClick}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition font-semibold"
            >
              <Play className="w-6 h-6 fill-black" />
              <span>Play</span>
            </button>
            <button
              onClick={() => onToggleMyList(movie)}
              className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition font-semibold"
            >
              {isInMyList ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>My List</span>
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  <span>My List</span>
                </>
              )}
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-gray-500/70 rounded-full hover:bg-gray-500/50 transition border-2 border-gray-400">
              <Info className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <span className="text-green-400 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-300">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : '2024'}
            </span>
            {movie.media_type && (
              <span className="border border-gray-400 px-2 py-0.5 text-gray-300 text-sm">
                {movie.media_type === 'tv' ? 'TV Series' : 'Movie'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;