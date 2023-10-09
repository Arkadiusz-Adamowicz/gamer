import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const App = () => {
  const [games, setGames] = useState([]);
  console.log(games);
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
  const apiKey = import.meta.env.VITE_RAWG_KEY;

  useEffect(() => {
    fetchGames();
  }, [page]);

  const handleSelect = name => {
    setSelect(name);
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
        `https://api.rawg.io/api/games?key=${apiKey}&page=${page}`
      );
      const data = res.data.results;
      setGames(data);
      setFilteredGames(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='m-4 rounded-xl flex gap-3 text-white'>
      <div className='rounded-xl w-[200px] h-fit pb-1 bg-[#33374f] hidden sm:block'>
        <h2 className='p-2 text-xl font-bold text-center'>Genres</h2>
        {genres
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(genre => (
            <div
              key={genre.id}
              className={`m-2 hover:bg-white hover:text-[#1b1d29] cursor-pointer  rounded px-2 ${
                select === genre.id && 'bg-white text-black'
              }`}
              onClick={() => {
                handleSelect(genre.id);
                filterGames(genre);
              }}
            >
              <p>{genre.name}</p>
            </div>
          ))}
      </div>
      <div className='w-full rounded-xl bg-[#33374f]'>
        <div className='p-2 text-xl font-bold text-center flex items-center justify-between'>
          <BiSolidLeftArrow className='cursor-pointer' onClick={handlePrev} />
          <h2>Games</h2>
          <BiSolidRightArrow className='cursor-pointer' onClick={handleNext} />
        </div>
        <div className='grid base:grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center p-2 w-full justify-center'>
          {filteredGames.length > 0 ? (
            filteredGames
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map(game => (
                <div key={game.id} className='m-2 '>
                  <p className='mb-2'>
                    {game.name.length > 30
                      ? game.name.slice(0, 30) + '...'
                      : game.name}
                  </p>

                  <img
                    src={game.background_image}
                    alt={game.name}
                    className='h-[200px] w-[320px] rounded-xl object-cover transition-all ease-in-out duration-200 hover:border-[2px] hover:border-white border-[2px] border-transparent'
                  />
                </div>
              ))
          ) : (
            <div className='m-2'>
              <p>No data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
