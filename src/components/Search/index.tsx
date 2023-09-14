import { FC, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Movie, CustomError as CustomErrorType } from '../../types';
import SearchMovie from './Movie';
import { axios } from '../../utils/axios';
import { Input } from '../../ui/Input';
import { AiOutlineSearch } from 'react-icons/ai';
import { API_KEY } from '../../config';
import { useDebounce } from '../../hooks';

const Search: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const debouncedSearch = useDebounce(query, 250);

  const fetchMovieSearchResults = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        debouncedSearch
      )}&api_key=${API_KEY}`
    );
    return response.data.results;
  };

  const { data, isLoading, isRefetching, error, refetch, isError, fetchStatus } = useQuery(
    ['movieSearch'],
    () => fetchMovieSearchResults(),
    {
      enabled: Boolean(query),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false
    }
  );

  const customError = error as CustomErrorType;

  useEffect(() => {
    if (!initialLoad && Boolean(data)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!debouncedSearch && fetchStatus === 'idle' && !initialLoad) return;
    refetch();
    setInitialLoad(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative max-w-[500px] text-black">
      <Input
        type="text"
        className="text-white w-full"
        placeholder="What do you want to watch?"
        rightIcon={<AiOutlineSearch size="20px" fill="white" />}
        onChange={handleInputChange}
      />
      <div className="overflow-scrollbar absolute rounded-md top-14 left-0 max-h-80 w-full z-50 overflow-auto bg-white shadow-md">
        {isLoading || isRefetching ? (
          fetchStatus !== 'idle' ? (
            <p className="text-center">Loading Movies ...</p>
          ) : null
        ) : data && data.length > 0 ? (
          <div>
            {data.map((movie: Movie) => (
              <SearchMovie
                key={movie.id}
                id={movie?.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
              />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center">
            {customError?.response?.data?.status_message || 'Error Loading Movies'}
          </p>
        ) : (
          <p className="text-center">
            {data && data.length === 0 && debouncedSearch ? 'No Movie Found' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
