import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BrokerSurvey from './pages/BrokerSurvey';
import BotswanaSurvey from './pages/BotswanaSurvey';
import BotswanaLifeSurvey from './pages/BotswanaLifeSurvey';
import ZambiaSurvey from './pages/ZambiaSurvey';
import ZambiaLifeSurvey from './pages/ZambiaLifeSurvey';
import ThoughtLeadership from './pages/ThoughtLeadership';
import NewsRoom from './pages/NewsRoom';

function App() {
  console.log('App component rendering');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/broker-survey" element={<BrokerSurvey />} />
            <Route path="/broker-survey/botswana-short-term" element={<BotswanaSurvey />} />
            <Route path="/broker-survey/botswana-life" element={<BotswanaLifeSurvey />} />
            <Route path="/broker-survey/zambia-short-term" element={<ZambiaSurvey />} />
            <Route path="/broker-survey/zambia-life" element={<ZambiaLifeSurvey />} />
            <Route path="/thought-leadership" element={<ThoughtLeadership />} />
            <Route path="/news" element={<NewsRoom />} />
            <Route path="*" element={<div className="p-8"><h1 className="text-2xl">404 - Page Not Found</h1><p>Path: {window.location.pathname}</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;