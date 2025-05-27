import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://elevatemasai-1.onrender.com/api/movie/get")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.
          AllMovies)
      })

      .catch(err => console.error("Failed to load data", err));
  }, []);

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
