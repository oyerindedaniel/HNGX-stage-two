import { FC, useMemo } from 'react';
import { Imdb, RottenTomatoes } from '../../assets';
import { Movie } from '../../types';

const MovieCard: FC<Partial<Movie>> = ({
  poster_path,
  title,
  original_title,
  vote_average,
  release_date
}) => {
  return (
    <div className="relative" data-testid="movie-card">
      <div className="mb-1">
        <img
          data-testid="movie-poster"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
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
          <img src={Imdb} alt="" />
          <div>{(Number?.(vote_average) || 0) * 10} / 100</div>
        </div>
        <div className="flex gap-3">
          <img src={RottenTomatoes} alt="" />
          <div>{(Number?.(vote_average) || 0) * 10}%</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
