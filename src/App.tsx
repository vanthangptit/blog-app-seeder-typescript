import React from 'react';

// ** Components
import Footer from '@components/Footer';
import Header from '@components/Header';

// ** Pages
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Footer />
      <Home />
      <Header />
    </div>
  );
}

export default App;
