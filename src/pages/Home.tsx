import React from 'react';
import Hero from '../components/home/Hero';
import Purpose from '../components/home/Purpose';
import About from '../components/home/About';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Purpose />
    </div>
  );
}