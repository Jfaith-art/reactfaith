import { NavLink } from 'react-router-dom'

function Header({ favoriteCount }) {
  return (
    <header className="header">
      <h1 className="logo">⚙ MotoParts Gallery</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites">Favorites ({favoriteCount})</NavLink>
      </nav>
    </header>
  )
}

export default Header
