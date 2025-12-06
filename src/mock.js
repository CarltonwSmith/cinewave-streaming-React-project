// Mock data for Netflix clone - will be replaced with TMDB API

export const mockMovies = [
  {
    id: 1,
    title: "Stranger Things",
    backdrop_path: "https://images.unsplash.com/photo-1574267432644-f610a4ab46c3?w=1200",
    poster_path: "https://images.unsplash.com/photo-1574267432644-f610a4ab46c3?w=400",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    vote_average: 8.7,
    release_date: "2016-07-15",
    media_type: "tv"
  },
  {
    id: 2,
    title: "The Dark Knight",
    backdrop_path: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200",
    poster_path: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    vote_average: 9.0,
    release_date: "2008-07-18",
    media_type: "movie"
  },
  {
    id: 3,
    title: "Inception",
    backdrop_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    vote_average: 8.8,
    release_date: "2010-07-16",
    media_type: "movie"
  },
  {
    id: 4,
    title: "Breaking Bad",
    backdrop_path: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200",
    poster_path: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400",
    overview: "A high school chemistry teacher turned meth cook partners with a former student to secure his family's future.",
    vote_average: 9.5,
    release_date: "2008-01-20",
    media_type: "tv"
  },
  {
    id: 5,
    title: "Interstellar",
    backdrop_path: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200",
    poster_path: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    vote_average: 8.6,
    release_date: "2014-11-07",
    media_type: "movie"
  }
];

export const mockCategories = [
  { id: 'trending', title: 'Trending Now', movies: mockMovies },
  { id: 'popular', title: 'Popular on Netflix', movies: mockMovies },
  { id: 'toprated', title: 'Top Rated', movies: mockMovies },
  { id: 'action', title: 'Action Movies', movies: mockMovies },
  { id: 'comedy', title: 'Comedies', movies: mockMovies }
];

export const mockUser = {
  email: "user@netflix.com",
  name: "Demo User",
  myList: [1, 3]
};