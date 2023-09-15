import { useParams } from 'react-router-dom';
import { Movie as MovieType, CustomError as CustomErrorType } from '../types';
import { axios } from '../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { API_KEY } from '../config';
import Loading from '../ui/Loading';
import { Star } from '../assets';
import { Badge } from '../ui/Badge';
import { formatRuntime, convertToUTC } from '../libs/utils';
import Error from '../ui/Error';

const Movie = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<{ data: MovieType }>(
    ['movie-by-id'],
    () => axios.get(`https://api.themoviedb.org/3/movie/${id}&api_key=${API_KEY}`),
    {
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      onSuccess: () => {},
      onError: (error) => {
        console.error(error);
      }
    }
  );

  const { data: movie } = data || {};

  const customError = error as CustomErrorType;

  // const bgImage = {
  //   backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.poster_path})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   borderRadius: '50px'
  // };

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error
        text={customError?.response?.data?.status_message || 'Error Fetching Movie'}
        refetch={refetch}
      />
    );
  }

  return (
    <div className="p-5 min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 items-center max-w-[1500px] mx-auto">
      <img
        style={{
          width: 'max-content',
          height: '40vw',
          objectFit: 'contain',
          objectPosition: 'top',
          borderRadius: '15px'
        }}
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        alt={`${movie?.title}`}
      />
      <div className="w-[95%] md:[85%] lg:w-[80%]">
        <div className="flex gap-3 lg:gap-6 items-center mb-3 flex-wrap">
          <h1 className="text-xl font-bold" data-testid="movie-title">
            {movie?.title}
          </h1>
          <p data-testid="movie-runtime">{formatRuntime(Number(movie?.runtime))}</p>
          <div className="flex items-center flex-wrap gap-3">
            {movie &&
              movie?.genres.length > 0 &&
              movie?.genres.map((genre) => (
                <Badge key={genre.id} variant="outline">
                  {genre.name}
                </Badge>
              ))}
          </div>
          <div className="flex items-center gap-3 sm:ml-auto">
            <img src={Star} alt="" style={{ width: '18px', height: '18px' }} />
            <p>{movie?.vote_average}</p>
          </div>
        </div>

        <p className="mb-4 text-sm lg:text-md" data-testid="movie-overview">
          {movie?.overview}
        </p>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-brand">Release Date</h2>
          <p data-testid="movie-release-date">
            {convertToUTC((movie?.release_date || '') as string)}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-brand">Popularity</h2>
          <p>{movie?.popularity}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-brand">Production Companies</h2>
          <div className="flex flex-wrap items-center gap-3">
            {movie &&
              movie?.production_companies.length > 0 &&
              movie?.production_companies.map((company) => (
                <Badge key={company.id} variant="outline">
                  {company.name}
                </Badge>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-brand">Production Countries</h2>
          <div className="flex flex-wrap items-center gap-3">
            {movie &&
              movie.production_companies.length > 0 &&
              movie?.production_countries.map((country) => (
                <Badge key={country.iso_3166_1} variant="outline">
                  {country.name}
                </Badge>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-brand">Spoken Languages</h2>
          <div className="flex flex-wrap items-center gap-3">
            {movie &&
              movie?.spoken_languages.length > 0 &&
              movie?.spoken_languages.map((language) => (
                <Badge key={language.iso_639_1} variant="outline">
                  {language.name}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
