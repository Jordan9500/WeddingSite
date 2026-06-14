import { Link } from 'react-router-dom'
import { couple, venue, weddingDateISO } from '../data/weddingData'

const weddingDate = new Date(weddingDateISO)
const formattedDate = weddingDate.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-names">
          {couple.partner1} &amp; {couple.partner2}
        </p>
        <p>
          {formattedDate} &middot; {venue.name}
        </p>
        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/details">Event Details</Link>
          <Link to="/rsvp">RSVP</Link>
        </nav>
        <p>We can't wait to celebrate with you!</p>
      </div>
    </footer>
  )
}
