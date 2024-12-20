import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import ComingSoon from './components/ComingSoon'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Registration from './pages/Registration'
import Contact from './pages/Contact'
import RegistrationSuccess from './pages/RegistrationSuccess'
import AudioPlayer from './components/AudioPlayer';
import Admin from './pages/Admin';
import RegistrationDetails from './pages/RegistrationDetails';
import MessageDetails from './pages/MessageDetails';
import Inventory from './pages/Inventory';
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="App">
        <Navbar />
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/registrations" element={<RegistrationDetails />} />
          <Route path="/admin/messages" element={<MessageDetails />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route 
            path="/music" 
            element={
              <ComingSoon 
                title="Tuku Music Experience"
                description="Get ready to experience the soul-stirring music of Oliver Mtukudzi. Our music platform will feature his timeless classics, rare recordings, and the stories behind his legendary compositions."
              />
            } 
          />
          <Route 
            path="/merch" 
            element={
              <ComingSoon 
                title="Tuku Legacy Merchandise"
                description="Exclusive merchandise celebrating Oliver Mtukudzi's legacy is on its way. Stay tuned for a unique collection that honors the spirit of Tuku Music."
              />
            } 
          />
          <Route 
            path="/omifa" 
            element={
              <ComingSoon 
                title="OMIFA - Oliver Mtukudzi Foundation"
                description="The Oliver Mtukudzi Foundation is preparing to launch its initiatives supporting young athletic talent in Zimbabwe. Join us in nurturing the next generation of athletes while preserving Tuku's legacy of excellence."
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
