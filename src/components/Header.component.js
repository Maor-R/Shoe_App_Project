// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';


// import logo from '../assets/images/logo.png';

// const Header = ({ cart, user, setUser }) => {
//   const navigate = useNavigate();


//   return (
//     <header>
//       <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
//         <Container>
//           <Link to='/'>
//             <Navbar.Brand className='mr-n4'>
//               <Navbar.Brand>
//                 <img src={logo} alt='logo' className='logo-img' />
//               </Navbar.Brand>
//             </Navbar.Brand>
//           </Link>
//           <Nav className='mr-auto'>
//             {user && <NavLink
//               to='/add'
//               className={({ isActive }) => isActive && 'is-active'}
//             >
//               הוספת מוצר
//             </NavLink>}

//           </Nav>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;


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
    </nav>
  );
};
export default Header;
