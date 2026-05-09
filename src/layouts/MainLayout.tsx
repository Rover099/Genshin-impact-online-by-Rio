import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ExitIntent } from '../components/ExitIntent';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-genshin-dark text-white selection:bg-genshin-gold selection:text-genshin-dark relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ExitIntent />
    </div>
  );
}
