import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import useFetch from "./hooks/useFetch";

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
  const firstGame = filteredGames.length > 0 && filteredGames[0];

  return (
    <div className="m-4 flex gap-5 text-white">
      <div className="rounded-xl w-[200px] h-fit bg-[#33374f] hidden sm:block shadow-[#1b1d29] shadow">
        <h2 className="p-3 text-lg  font-bold text-center ">GENRES</h2>
        {genres
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((genre) => (
            <div
              key={genre.id}
              className={`m-2 mb-3 p-1 hover:bg-white hover:text-[#1b1d29] hover:shadow-[#1b1d29] hover:shadow cursor-pointer font-semibold rounded-lg ${
                select === genre.id &&
                "bg-white text-black shadow-[#1b1d29] shadow"
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
      <div className="w-full rounded-xl bg-[#33374f] shadow-[#1b1d29] shadow">
        <h2 className="p-3 text-lg  font-bold text-center ">GAMES</h2>
        <div className="px-2 text-lg font-bold text-center flex items-center justify-between flex-col">
          <div className="flex justify-between items-center w-full relative">
            <BiSolidLeftArrow
              className="cursor-pointer absolute left-5 z-10"
              onClick={handlePrev}
            />
            <div className="h-[250px] md:h-[400px]  w-full m-2 shadow shadow-[#1b1d29] rounded-xl ">
              <img
                src={firstGame.background_image}
                alt=""
                className="object-cover object-top w-full h-full rounded-xl"
              />
              <div className="w-full text-left z-100 rounded-l-xl">
                <h2 className="absolute top-0 p-3 text-xl md:text-2xl text-white font-bold z-100 title">
                  {firstGame.name}
                </h2>
              </div>
            </div>
            <BiSolidRightArrow
              className="cursor-pointer absolute right-5"
              onClick={handleNext}
            />
          </div>
        </div>
        <div className="grid base:grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-center p-2 w-full justify-center font-semibold">
          {filteredGames.length > 0 ? (
            filteredGames
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((game) => (
                <div key={game.id} className="m-2 rounded-xl">
                  <p className="mb-2">
                    {game.name.length > 30
                      ? game.name.slice(0, 30) + "..."
                      : game.name}
                  </p>

                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="h-[200px] w-[320px] rounded-xl object-cover shadow-[#1b1d29] shadow  transition-all ease-in-out duration-100 hover:scale-[103%]"
                  />
                </div>
              ))
          ) : (
            <div className="m-2">
              <p>No data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
