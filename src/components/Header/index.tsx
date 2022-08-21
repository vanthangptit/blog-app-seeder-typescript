import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITES_URL, AWS_S3_URL } from '@src/constants';

const listMenu = [
  {
    href: SITES_URL.HOME,
    label: 'Home'
  },
  {
    href: SITES_URL.ABOUT,
    label: 'About Me'
  },
  {
    href: SITES_URL.BLOG,
    label: 'Blog'
  },
  {
    href: SITES_URL.CONTACT,
    label: 'Contact'
  }
];

const Header = () => {
  const [ showStatements, setShowStatements ] = React.useState(false);
  const onClick = () => setShowStatements(!showStatements);

  return (
    <header className={'header' + (showStatements ? ' is-shown' : '')}>
      <button className="header-toggle" type="button" onClick={onClick}>
        <span/>
      </button>

      <nav className="navbar">
        <div className="navbar-inner">
          <Link className="navbar-brand" to={SITES_URL.HOME}>
            <img src={AWS_S3_URL + 'vanthang.png'}/>
          </Link>
        </div>

        <ul className="navbar-menu">
          {
            listMenu.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} className={({ isActive }) => 'navbar-link ' + (isActive ? 'is-active' : '')}>
                  {item.label}
                </NavLink>
              </li>
            ))
          }
        </ul>

        <div className="navbar-copyright">
          © 2022 React Template
        </div>
      </nav>
    </header>
  );
};

export default Header;
