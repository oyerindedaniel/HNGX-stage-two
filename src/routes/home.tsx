import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Movie, CustomError as CustomErrorType } from '../types';
import {
  Logo,
  HeaderImg,
  Imdb,
  RottenTomatoes,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Menu,
  PlayIcon
} from '../assets';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Button } from '../ui/Button';
import MovieCard from '../components/MovieCard';
import Search from '../components/Search';
import { API_KEY } from '../config';
import Error from '../ui/Error';

function App() {
  const headerStyle = {
    backgroundImage: `url(${HeaderImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  const { data, isLoading, isError, isRefetching, refetch, error } = useQuery(
    ['top-rated'],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
      ),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      onSuccess: () => {},
      onError: (error) => {
        console.error(error);
      }
    }
  );

  const { results: movies } = data?.data || {};

  const customError = error as CustomErrorType;

  return (
    <div className="text-white max-w-[1500px] mx-auto">
      <div className=" max-w-[1500px] absolute top-0 flex -translate-x-1/2 justify-between items-center w-[90%] p-2 left-1/2 ">
        <div className="flex gap-2 items-center">
          <img src={Logo} alt="Movie Box" />
          <div className="text-white font-semibold">MovieBox</div>
        </div>
        <div className="max-w-[500px] w-full hidden lg:block">
          <Search />
        </div>
        <div className="flex gap-8 items-center">
          <Link style={{ color: 'white' }} to="/">
            Sign in
          </Link>
          <img src={Menu} alt="Menu" />
        </div>
      </div>
      <header style={headerStyle} className="min-h-screen mb-10">
        <div className="max-w-[350px] md:max-w-[500px] mx-auto pt-[80px] w-full block lg:hidden">
          <Search />
        </div>
        <div className="pt-[100px]  md:pt-[150px] w-[90%] mx-auto min-h-full h-full flex items-start justify-between flex-col">
          <h1 className="mb-3 text-4xl md:text-5xl font-semibold">
            John Wick 3 : <br />
            Parabellum
          </h1>
          <div className="flex gap-5 mb-4">
            <div className="flex gap-3">
              <img src={Imdb} alt="imdb rating" />
              <div>86.0 / 100</div>
            </div>
            <div className="flex gap-3">
              <img src={RottenTomatoes} alt="rotten tomatoes rating" />
              <div>97%</div>
            </div>
          </div>
          <p className="text-md md:text-lg max-w-[100%] sm:max-w-[70%] md:max-w-[60%] mb-8">
            John Wick is on the run after killing a member of the international assassins' guild,
            and with a $14 million price tag on his head, he is the target of hit men and women
            everywhere.
          </p>

          <Button variant="brand" size="lg" className="uppercase">
            <img
              src={PlayIcon}
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
              alt=""
            />{' '}
            Watch Tailer
          </Button>
        </div>
      </header>
      <main className="text-black mb-20">
        <section className="w-[90%] mx-auto">
          <div className="flex justify-between items-start">
            <h2 className="mb-8 text-2xl md:text-3xl font-semibold">Top Rated</h2>
            <Link to="/" style={{ color: '#e21e48' }}>
              <span className="flex gap-2 items-center">
                <span>See more</span>
                <MdOutlineKeyboardArrowRight size="20px" />
              </span>
            </Link>
          </div>
          {isLoading || isRefetching ? (
            <div className="min-h-[150px] flex items-center justify-center font-semibold text-md sm:text-lg md:text-xl">
              Fetching Top Rated Movies ...
            </div>
          ) : isError ? (
            <Error
              text={customError?.response?.data?.status_message || 'Error Fetching Movies'}
              refetch={refetch}
            />
          ) : movies && movies.length > 0 ? (
            <div className="grid grid-cols-auto-fill-minmax gap-8">
              {movies.slice(0, 10).map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie?.id}
                  poster_path={movie?.poster_path}
                  vote_average={movie?.vote_average}
                  original_title={movie?.original_title}
                  title={movie?.title}
                  release_date={movie?.release_date}
                />
              ))}
            </div>
          ) : (
            <div className="min-h-[150px] flex items-center justify-center font-semibold text-md sm:text-lg md:text-xl">
              No Movies Found
            </div>
          )}
        </section>
      </main>
      <footer>
        <div className="flex gap-4 items-center justify-center mb-6">
          {[Facebook, Instagram, Twitter, Youtube].map((social, Idx: number) => {
            const SocialIcon = social;
            return (
              <span className="text-brand" key={Idx}>
                <a href="/" key={Idx}>
                  <img src={SocialIcon} alt="Social" />
                </a>
              </span>
            );
          })}
        </div>
        <div className="flex gap-4 items-center justify-center text-black flex-col md:flex-row font-semibold mb-6">
          {['Continue of Use', 'Privacy & Policy', 'Press Room'].map((value, Idx: number) => {
            return (
              <span key={Idx}>
                <Link to="/">{value}</Link>
              </span>
            );
          })}
        </div>
        <div className="text-center text-gray-500 text-sm mb-12 font-semibold">
          &copy; 2023 MovieBox by Oyerinde Daniel
        </div>
      </footer>
    </div>
  );
}

export default App;
