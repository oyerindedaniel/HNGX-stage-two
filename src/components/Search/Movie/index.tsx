import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../../types';

const SearchMovie: FC<Partial<Movie>> = ({ id, poster_path, title, release_date }) => {
  return (
    <>
      <Link
        to={`/movie/${id}`}
        className="flex justify-start items-center py-3 px-4 hover:bg-neutral-200 min-h-5rem"
      >
        <div className="w-20 h-14 mr-4 vsm:mr-2">
          <img
            className="w-full h-full object-cover rounded-t-md rounded-b-md shadow-md"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={title}
          />
        </div>
        <span className="text-black">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm ">{release_date}</p>
        </span>
      </Link>
    </>
  );
};

export default SearchMovie;
