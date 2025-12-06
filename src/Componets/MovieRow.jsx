import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.offsetWidth * 0.8;
      const newScrollLeft = rowRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 0);
      setShowRightArrow(
        rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.offsetWidth - 10
      );
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-12 mb-8 group/row">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 hover:bg-black/80 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}
        
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 hover:bg-black/80 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;