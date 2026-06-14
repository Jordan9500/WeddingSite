import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Home
      </NavLink>
      <NavLink to="/our-story" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Our Story
      </NavLink>
      <NavLink to="/details" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Event Details
      </NavLink>
      <NavLink to="/rsvp" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        RSVP
      </NavLink>
    </nav>
  )
}
