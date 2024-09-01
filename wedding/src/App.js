import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import AppHeader from './components/header';
import AppHero from './components/Hero';
import Countdown from './components/Countdown';
import React from 'react';
import Where from './components/Where';
import Gifts from './components/Gifts';
import Footer from './components/Footer';
import Hotels from './components/Hotels';
import GalleryCarousel from './components/GalleryCarousel';
import PhotoSection from './components/PhotoSection';
import PhotoSection2 from './components/PhotoSection2';
import PhotoSection3 from './components/PhotoSection3';
import DressCode from './components/DressCode';
import Confirmations from './components/Confirmations';

function App() {
    const endDate = new Date('2024-11-09T16:00:00'); // End date for the countdown


  return (
    <div className="App">
      <header id="header">
        {/* <AppHeader/> */}
      </header>
      <main>
        <AppHero/>
        <Countdown endDate={endDate}/>
        <Where/>
        <PhotoSection/>
        <Hotels/>
        <PhotoSection2/>
        <Gifts/>
        <GalleryCarousel/>
        <DressCode/>
        <Confirmations/>
        {/* <PhotoSection3/> */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
