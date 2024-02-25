import { Link, NavLink, Outlet } from 'react-router-dom';
import { ROUTE } from '../../constants/constants';

const Layout = () => {
  return (
    <div>
      <header>
        <div>
          <NavLink to={ROUTE.MAIN}>Home</NavLink>
          <NavLink to={ROUTE.HOTELS}>Жилье</NavLink>
          <NavLink to={ROUTE.PROFILE}>Профиль</NavLink>
          <NavLink to={ROUTE.LOGIN}>Вход</NavLink>
          <NavLink to={ROUTE.REGISTER}>регистрация</NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div>@ 2024</div>
        <div>
          <Link to="https://github.com/annettabel87">
            <img src="/githubIcon.svg" alt="github" />
          </Link>
        </div>
        <div>Анна Репешко</div>
      </footer>
    </div>
  );
};

export default Layout;
