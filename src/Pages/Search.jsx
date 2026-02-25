import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { mockMovies } from '../mock';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const searchMovies = (searchQuery) => {
    setLoading(true);
    // Mock search - will be replaced with TMDB API
    setTimeout(() => {
      const filtered = mockMovies.filter(movie =>
        (movie.title || movie.name).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const handleMovieClick = (movie) => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-4 md:px-12">
      <div className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-semibold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400">
          {loading ? 'Searching...' : `${results.length} results found`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E50914]"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-xl">No results found for "{query}"</p>
          <p className="text-gray-500 mt-2">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default Search;