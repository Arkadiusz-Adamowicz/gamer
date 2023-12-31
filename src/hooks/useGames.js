import { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_RAWG_KEY;

const useGames = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const firstGame = filteredGames.length > 0 && filteredGames[0];
  let apiUrl = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`

  useEffect(() => {
    fetchGames();
  }, [page, select, searchTitle]);

  const fetchGames = async () => {
    try {
        if (select !==0) {
          apiUrl += `&genres=${select}&page=${page}`
        }
      const res = await axios.get(apiUrl);
      setGames(res.data.results);
      setFilteredGames(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = async (id) => {
    try {
      const res = await axios.get(
       `${apiUrl}&genres=${id}&page=${page}`
      );
      setFilteredGames(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async searchTitle => {
    try {
      const res = await axios.get(
        `${apiUrl}&search=${searchTitle}`
      );
      setFilteredGames(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = id => {
    setSelect(id);
  };

  const handlePrev = () => {
    setPage(page => page - 1);
  };

  const handleNext = () => {
    setPage(page => page + 1);
  };

  const handleClear = e => {
    if (e.key === 'Enter') {
      setSearchTitle('');
      fetchGames();
    }
  };

  return {
    games,
    select,
    filteredGames,
    firstGame,
    searchTitle,
    handleFilter,
    handleSearch,
    handleSelect,
    handlePrev,
    handleNext,
    setSearchTitle,
    handleClear,
  };
};

export default useGames;
