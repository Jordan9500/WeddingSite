import Countdown from '../components/Countdown'
import Reveal from '../components/Reveal'
import { couple, weddingDateISO, venue, story } from '../data/weddingData'

const weddingDate = new Date(weddingDateISO)

const formattedDate = weddingDate.toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const formattedTime = weddingDate.toLocaleTimeString(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

export default function Home() {
  return (
    <section className="page home">
      <div className="hero-section">
        <img className="hero-bg" src={story.photo} alt="" aria-hidden="true" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">We're getting married!</p>
          <h1 className="couple-names">
            {couple.partner1} <span className="amp">&amp;</span> {couple.partner2}
          </h1>
          <p className="wedding-date">{formattedDate}</p>
          <p className="wedding-time">{formattedTime} &middot; {venue.name}</p>

          <Countdown targetDate={weddingDate} />
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="home-body">
        <p className="home-note">
          We can't wait to celebrate with you. Check the Event Details page for
          the schedule and travel info, and don't forget to RSVP!
        </p>

        <Reveal className="story-blurb">
          <h2>{story.heading}</h2>
          <p>{story.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
