import Reveal from '../components/Reveal'
import { couple, gallery } from '../data/weddingData'

export default function OurStory() {
  return (
    <section className="page our-story">
      <h1>Our Story</h1>
      <p className="home-note">
        A few of our favorite moments together, {couple.partner1} &amp; {couple.partner2}.
        Replace these placeholders with your own photos in <code>src/data/weddingData.js</code>.
      </p>

      <div className="gallery-grid">
        {gallery.map((photo, index) => (
          <Reveal key={photo.src} delay={index * 120} className="gallery-item-wrap">
            <figure className="gallery-item">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
