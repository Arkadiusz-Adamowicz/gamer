/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_RAWG_KEY;

const useFetch = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(0);
  const genres = [
    {
      id: 2,
      name: 'Shooter',
    },
    {
      id: 3,
      name: 'Action',
    },
    {
      id: 4,
      name: 'Adventure',
    },
    {
      id: 5,
      name: 'RPG',
    },
    {
      id: 7,
      name: 'Puzzle',
    },
    {
      id: 51,
      name: 'Indie',
    },
    {
      id: 59,
      name: 'Multiplayer',
    },
    {
      id: 83,
      name: 'Platformer',
    },
  ];

  useEffect(() => {
    fetchGames();
  }, [page]);

  const handleSelect = id => {
    setSelect(id);
  };

  const filterGames = genre => {
    const { id, name } = genre;
    name === 'All'
      ? setFilteredGames(games)
      : setFilteredGames(
          games.filter(
            game => game.genres && game.genres.find(genre => genre.id === id)
          )
        );
  };

  const handlePrev = () => {
    page > 0 && setPage(page => page - 1);
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
      const data = res.data.results;
      setGames(data);
      setFilteredGames(data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    games,
    filteredGames,
    select,
    genres,
    handleSelect,
    filterGames,
    handlePrev,
    handleNext,
  };
};

export default useFetch;
