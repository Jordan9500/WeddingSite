import { useState } from 'react'
import { rsvpFormAction } from '../data/weddingData'

export default function RSVP() {
  const [status, setStatus] = useState('idle')
  const [attending, setAttending] = useState('yes')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.target
    const data = new FormData(form)

    try {
      const response = await fetch(rsvpFormAction, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
        setAttending('yes')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="page rsvp">
        <h1>RSVP</h1>
        <p className="rsvp-success">Thank you! Your RSVP has been received.</p>
      </section>
    )
  }

  return (
    <section className="page rsvp">
      <h1>RSVP</h1>
      <p>Please let us know if you'll be able to join us by filling out the form below.</p>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text" required />

        <fieldset className="attending-field">
          <legend>Will you be attending?</legend>
          <label className="radio-label">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
            />
            Yes, I'll be there
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={() => setAttending('no')}
            />
            Sorry, can't make it
          </label>
        </fieldset>

        {attending === 'yes' && (
          <>
            <label htmlFor="guestCount">Number of Guests (including yourself)</label>
            <input id="guestCount" name="guestCount" type="number" min="1" defaultValue="1" />

            <label htmlFor="dietary">Dietary Notes / Allergies</label>
            <textarea id="dietary" name="dietary" rows="3" placeholder="e.g. vegetarian, gluten-free, nut allergy" />

            <label htmlFor="songRequest">Song Request</label>
            <input id="songRequest" name="songRequest" type="text" placeholder="What will get you on the dance floor?" />
          </>
        )}

        <button type="submit" className="button" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
        </button>

        {status === 'error' && (
          <p className="rsvp-error">
            Something went wrong sending your RSVP. Please try again, or contact us directly.
          </p>
        )}
      </form>
    </section>
  )
}
