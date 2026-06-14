import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { couple } from '../data/weddingData'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" end className="navbar-brand">
          {couple.partner1.split(' ')[0]} <span className="amp">&amp;</span> {couple.partner2.split(' ')[0]}
        </NavLink>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/our-story" className={linkClass}>
            Our Story
          </NavLink>
          <NavLink to="/details" className={linkClass}>
            Event Details
          </NavLink>
          <NavLink to="/rsvp" className={linkClass}>
            RSVP
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
