import {
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiSearchAlt2,
} from "react-icons/bi";
import { Grid } from "react-loader-spinner";
import useGames from "./hooks/useGames";
import useGenres from "./hooks/useGenres";
import logo from "./assets/logo.png";

const App = () => {
  const { genres } = useGenres();
  const {
    firstGame,
    filteredGames,
    select,
    handleClear,
    handleFilter,
    handleSelect,
    handleSearch,
    handlePrev,
    handleNext,
  } = useGames();

  return (
    <div className="m-4 flex gap-4 text-white">
      {/* GENRES */}
      <div className="rounded-xl h-fit bg-[#33374f] hidden sm:block shadow-[#1b1d29] shadow">
        <h2 className="p-3 mb-[-5px] text-lg font-bold text-center ">Genres</h2>
        {genres
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((genre) => (
            <div
              key={genre.id}
              className={`m-2 mb-3 px-2 py-1.5 transition-all w-[180px] ease-in-out duration-100 hover:${
                select === genre.id ? "bg-[#1b1d29]" : "bg-[#2c2f45]"
              } cursor-pointer rounded-lg ${
                select === genre.id && "bg-[#1b1d29]"
              }`}
              onClick={() => {
                handleSelect(genre.id);
                handleFilter(genre.id);
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={genre.image_background}
                  alt={genre.name}
                  className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md object-cover"
                />
                {genre.name}
              </div>
            </div>
          ))}
      </div>
      {/* MAIN SECTION */}
      <div className="flex flex-col">
        {/* HEADER */}
        <div className="mb-4 w-full shadow bg-[#33374f] rounded-xl p-2">
          <div className="md:flex md:justify-between items-center">
            <div
              className="w-full flex items-center justify-center md:justify-normal mb-3 md:mb-0 cursor-pointer"
              onClick={handleClear}
            >
              <img src={logo} alt="logo" className="w-[150px]" />
            </div>
            <div className="flex items-center gap-1 border bg-white rounded-lg m-2">
              <BiSearchAlt2 size={25} className="text-[#33374f] ml-2" />
              <input
                type="text"
                className="p-2 w-full md:w-[300px] rounded-lg outline-none text-[#1b1d29]"
                placeholder="Search game..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl bg-[#33374f] shadow-[#1b1d29] shadow py-2">
          {/* BANNER */}
          <div className="px-2 text-lg font-bold text-center flex items-center justify-between flex-col w-full">
            <div className="flex justify-between items-center w-full relative w-full">
              {firstGame && (
                <BiSolidLeftArrow
                  className="cursor-pointer absolute left-5 z-10"
                  onClick={handlePrev}
                />
              )}
              <div className="h-[250px] md:h-[400px] w-full m-2 shadow shadow-[#1b1d29] rounded-xl ">
                {firstGame ? (
                  <img
                    src={firstGame.background_image}
                    alt={firstGame.name}
                    className="object-cover object-top w-full h-full rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full mt-[30%]">
                    <Grid color="#1b1d29" />
                  </div>
                )}
                <div className="w-full text-left z-100 rounded-l-xl">
                  <h2 className="absolute bottom-0 p-5 text-xl md:text-2xl text-white font-bold z-100 title">
                    {firstGame.name}
                  </h2>
                </div>
              </div>
              {firstGame && (
                <BiSolidRightArrow
                  className="cursor-pointer absolute right-5"
                  onClick={handleNext}
                />
              )}
            </div>
          </div>
          {/* GAMES LIST */}
          <div className="grid base:grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 content-center p-2 w-full justify-center font-semibold">
            {filteredGames.length > 0 &&
              filteredGames
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map((game) => (
                  <div key={game.id} className="m-2 rounded-xl">
                    <h2 className="mb-2">
                      {game.name.length > 30
                        ? game.name.slice(0, 30) + "..."
                        : game.name}
                    </h2>
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="h-[200px] w-[320px] rounded-xl object-cover shadow-[#1b1d29] shadow transition-all ease-in-out duration-100 hover:scale-[103%]"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
