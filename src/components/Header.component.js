import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar'>
      <NavLink
        to='/'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Home
      </NavLink>
      <NavLink
        to='/shoes'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Shoes
      </NavLink>

      <NavLink
        to='/add'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Add
      </NavLink>

      <NavLink
        to='/outlet'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Outlet
      </NavLink>
    </nav>
  );
};
export default Header;
