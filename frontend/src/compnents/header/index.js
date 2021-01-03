// libraries
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
//utils
import { logout } from '../../utilities/auth';
//auth context
import {authContext} from '../../context/auth';

// styles
import './index.css';

function Header() {
  const {loggedIn,setLoggedIn} = useContext(authContext);
  //util function
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setLoggedIn(false);
  }

  let html = <Fragment>
    <Link to="/login" className="Header-btn">Login</Link>
    <Link to="/join" className="Header-btn">Join</Link>
  </Fragment>
  if(loggedIn)
    html = <Fragment>
        <Link to="/films/create" className="Header-btn">Create</Link>
        <a href="/films" className="Header-btn" onClick = {handleLogout}>Logout</a>
    </Fragment>;
  return (
    <header className="Header">
      <Link to="/films" className="Header-logo">
        <h1 className="Header-logoText">Movies</h1>
      </Link>
      { html }
  
    </header>
  );
}

export default Header;
