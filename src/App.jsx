import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import EventDetails from './pages/EventDetails'
import RSVP from './pages/RSVP'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/details" element={<EventDetails />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
