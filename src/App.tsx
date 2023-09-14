import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/home';
import Movie from './routes/movie';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
