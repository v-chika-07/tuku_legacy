import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Music from './pages/Music'
import Merch from './pages/Merch'
import OLIFA from './pages/OLIFA'
import Contact from './pages/Contact'
import Registration from './pages/Registration'
import ComingSoon from './pages/ComingSoon'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/music" element={<ComingSoon />} />
          <Route path="/merch" element={<ComingSoon />} />
          <Route path="/olifa" element={<ComingSoon />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
