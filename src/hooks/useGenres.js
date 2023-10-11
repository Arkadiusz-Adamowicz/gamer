import { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_RAWG_KEY;

const useGenres = () => {
   const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);
 

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_KEY}`
      );
      setGenres(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    genres,
    setGenres,
  };
};

export default useGenres;
