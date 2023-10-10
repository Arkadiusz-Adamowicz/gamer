/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_RAWG_KEY;

const useFetch = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(0);
  const [searchGame, setSearchGame] = useState('');

  useEffect(() => {
    fetchGames();
    fetchGenres();
  }, [page]);

  const handleSelect = id => {
    setSelect(id);
  };

  // const handleSearch = () => {
  //   const searchedGame = filteredGames.filter(
  //     game =>
  //       game.name && game.name.toLowerCase().includes(searchGame.toLowerCase())
  //   );
  //   setFilteredGames(searchedGame);
  // };

  const filterGames = id => {
    setFilteredGames(games.filter(genre => genre.id && genre.id === id));
  };

  const handlePrev = () => {
    setPage(page => page - 1);
  };

  const handleNext = () => {
    setPage(page => page + 1);
  };

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

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_KEY}`
      );
      setGenres(res.data.results);
      console.log(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    games,
    filteredGames,
    select,
    genres,
    setGenres,
    searchGame,
    setSearchGame,
    handleSelect,
    // handleSearch,
    filterGames,
    handlePrev,
    handleNext,
  };
};

export default useFetch;
