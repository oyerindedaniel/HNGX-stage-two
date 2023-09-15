import { FC } from 'react';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Imdb, RottenTomatoes } from '../../assets';
import { Movie } from '../../types';
import { Button } from '../../ui/Button';
const MovieCard: FC<Partial<Movie>> = ({ id, poster_path, title, vote_average, release_date }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="relative" data-testid="movie-card">
        <Button size="sm" className="absolute right-3 top-3" variant="brand">
          <MdOutlineFavoriteBorder size="24px" />
        </Button>
        <div className="mb-1">
          <img
            data-testid="movie-poster"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={title}
          />
        </div>
        <p className="mb-1" data-testid="movie-title">
          {title}
        </p>
        <p className="mb-1" data-testid="movie-release-date">
          {release_date}
        </p>
        <div className="flex gap-5 mb-4">
          <div className="flex gap-3">
            <img src={Imdb} alt="imdb rating" />
            <div>{(Number?.(vote_average) || 0) * 10} / 100</div>
          </div>
          <div className="flex gap-3">
            <img src={RottenTomatoes} alt="rotten tomatoes rating" />
            <div>{(Number?.(vote_average) || 0) * 10}%</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
