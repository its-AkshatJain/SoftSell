import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget'; // ✅ Import your Chat component
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ChatWidget /> {/* ✅ Add your ChatWidget here */}
    </Router>
  );
}

export default App;
