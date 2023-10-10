import useFetch from '../hooks/useFetch';
import logo from '../assets/logo.png';
import { BiSearchAlt2 } from 'react-icons/bi';

const Header = () => {
  const { searchGame, setSearchGame } = useFetch();
  return (
    <div className='md:flex md:justify-between items-center'>
      <div className='w-full flex items-center justify-center md:justify-normal mb-3 md:mb-0'>
        <img src={logo} alt='logo' className='w-[150px]' />
      </div>
      <div className='flex items-center gap-1 border bg-white rounded-lg m-2'>
        <BiSearchAlt2 size={25} className='text-[#33374f] ml-2' />
        <input
          className='p-2 w-full md:w-[300px] rounded-lg outline-none text-[#1b1d29]'
          placeholder='Search game...'
          onChange={e => setSearchGame(e.target.value)}
          value={searchGame}
        />
      </div>
    </div>
  );
};

export default Header;
