import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BrokerSurvey from './pages/BrokerSurvey';
import BotswanaSurvey from './pages/BotswanaSurvey';
import BotswanaLifeSurvey from './pages/BotswanaLifeSurvey';
import ThoughtLeadership from './pages/ThoughtLeadership';
import NewsRoom from './pages/NewsRoom';

function App() {
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
            <Route path="/thought-leadership" element={<ThoughtLeadership />} />
            <Route path="/news" element={<NewsRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;