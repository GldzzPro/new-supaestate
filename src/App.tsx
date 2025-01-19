import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyPage } from './pages/PropertyPage';
import { ContactPage } from './pages/ContactPage';
import { ScheduleMeetingPage } from './pages/ScheduleMeetingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<PropertyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/schedule-meeting" element={<ScheduleMeetingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;