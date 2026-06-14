import Reveal from '../components/Reveal'
import { venue, schedule, travel } from '../data/weddingData'

export default function EventDetails() {
  return (
    <section className="page details">
      <h1>Event Details</h1>

      <Reveal className="card">
        <h2>Venue</h2>
        <p className="venue-name">{venue.name}</p>
        <p className="venue-address">{venue.address}</p>
        <a className="button" href={venue.mapUrl} target="_blank" rel="noreferrer">
          View on Map
        </a>
      </Reveal>

      <Reveal className="card" delay={80}>
        <h2>Schedule</h2>
        <ul className="schedule-list">
          {schedule.map((item) => (
            <li className="schedule-item" key={item.title}>
              <span className="schedule-time">{item.time}</span>
              <div>
                <p className="schedule-title">{item.title}</p>
                <p className="schedule-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="card" delay={160}>
        <h2>Travel &amp; Accommodations</h2>
        <p>{travel.intro}</p>

        <h3>Where to Stay</h3>
        <ul className="accommodation-list">
          {travel.accommodations.map((hotel) => (
            <li className="hotel-item" key={hotel.name}>
              <img className="hotel-photo" src={hotel.photo} alt={hotel.name} loading="lazy" />
              <div>
                <a href={hotel.link} target="_blank" rel="noreferrer">{hotel.name}</a>
                <p>{hotel.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3>Getting There</h3>
        <ul className="travel-list">
          {travel.gettingThere.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
