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
    <div className='m-4 rounded-xl flex gap-5 text-white'>
      <div className='rounded-xl w-[200px] h-fit bg-[#33374f] hidden sm:block shadow-md shadow-black'>
        <h2 className='p-3 text-xl  font-bold text-center shadow-md shadow-black rounded-lg'>
          Genres
        </h2>
        {genres
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(genre => (
            <div
              key={genre.id}
              className={`mx-2 my-3 hover:bg-white hover:text-[#1b1d29] hover:shadow-md hover:shadow-black cursor-pointer font-semibold rounded-lg p-2 ${
                select === genre.id &&
                'bg-white text-black shadow-black shadow-md'
              }`}
              onClick={() => {
                handleSelect(genre.id);
                filterGames(genre);
              }}
            >
              {genre.name}
            </div>
          ))}
      </div>
      <div className='w-full rounded-xl bg-[#33374f] shadow-md shadow-black'>
        <div className='p-3 text-xl font-bold text-center flex items-center justify-between shadow-md shadow-black rounded-lg'>
          <BiSolidLeftArrow className='cursor-pointer' onClick={handlePrev} />
          <h2>Games</h2>
          <BiSolidRightArrow className='cursor-pointer' onClick={handleNext} />
        </div>
        <div className='grid base:grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center p-2 w-full justify-center font-semibold'>
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
                    className='h-[200px] w-[320px] rounded-xl object-cover transition-all ease-in-out duration-200 hover:border-[2px] hover:border-white border-[2px] border-transparent hover:scale-[103%] shadow-md shadow-black'
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
