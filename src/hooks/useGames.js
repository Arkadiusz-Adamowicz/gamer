import { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_RAWG_KEY;

const useGames = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(0);
  const firstGame = filteredGames.length > 0 && filteredGames[0];

  useEffect(() => {
    fetchGames();
  }, [page]);

   const fetchGames = async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_RAWG_KEY
        }&page=${page}`
      );
      setGames(res.data.results);
      setFilteredGames(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

    const handleFilter = async (id) => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_RAWG_KEY
        }&genres=${id}`
      );
      setFilteredGames(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSeaarch = () =>{

  // }

  const handleSelect = id => {
    setSelect(id);
  };

  const handlePrev = () => {
    setPage(page => page - 1);
  };

  const handleNext = () => {
    setPage(page => page + 1);
  };



  return {
    games,
    select,
    filteredGames,
    firstGame,
    handleFilter,
    handleSelect,
    handlePrev,
    handleNext,
  };
};

export default useGames;
