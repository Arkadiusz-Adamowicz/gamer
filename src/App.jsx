import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import useFetch from './hooks/useFetch';

const App = () => {
  const {
    filteredGames,
    select,
    genres,
    handleSelect,
    filterGames,
    handlePrev,
    handleNext,
  } = useFetch();

  return (
    <div className='m-4 rounded-xl flex gap-4 text-white'>
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
