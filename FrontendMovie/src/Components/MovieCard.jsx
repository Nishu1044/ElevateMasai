const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
    <h2>{movie.title}</h2>
    <p><strong>Director:</strong> {movie.director}</p>
    <p><strong>Year:</strong> {movie.year}</p>
    <p><strong>Genre:</strong> {movie.genre}</p>
  </div>
);

export default MovieCard;
