// libraries
import { Link } from 'react-router-dom';

// styles
import './index.css';

function Header() {
  return (
    <header className="Header">
      <Link to="/" className="Header-logo">
        <h1 className="Header-logoText">Movies</h1>
      </Link>
  
      <Link to="/login" className="Header-btn">Login</Link>
      <Link to="/join" className="Header-btn">Join</Link>
    </header>
  );
}

export default Header;
