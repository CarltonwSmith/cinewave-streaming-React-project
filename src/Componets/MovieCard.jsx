import React, { useState } from 'react';
import { Play, Plus, ChevronDown, Check } from 'lucide-react';

const MovieCard = ({ movie, onClick, isInMyList, onToggleMyList }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="min-w-[200px] md:min-w-[250px] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative rounded overflow-hidden">
        <img
          src={movie.poster_path || movie.backdrop_path}
          alt={movie.title || movie.name}
          className={`w-full h-[300px] md:h-[350px] object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="w-full h-[300px] md:h-[350px] bg-gray-800 animate-pulse" />
        )}
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1">
              {movie.title || movie.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
              </button>
              {onToggleMyList && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleMyList(movie);
                  }}
                  className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition"
                >
                  {isInMyList ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </button>
              )}
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-green-400 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-300">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : '2024'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;