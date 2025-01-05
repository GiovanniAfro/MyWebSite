// src/components/Layout/Portfolio.tsx
"use client";

import React from 'react';
import BoidsBackground from '../Background/BoidsBackground';

const Portfolio = () => {
  return (
    <>
      {/* Background fisso */}
      <div className="fixed inset-0 z-0">
        <BoidsBackground />
      </div>

      {/* Contenuto scrollabile */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">Il Tuo Nome</span>
              <div className="space-x-6">
                <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
                <a href="#experience" className="text-white hover:text-blue-400 transition-colors">Esperienza</a>
                <a href="#projects" className="text-white hover:text-blue-400 transition-colors">Progetti</a>
                <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contatti</a>
              </div>
            </div>
          </nav>
        </header>

        {/* Sezioni */}
        <main className="relative">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-white">
                Ciao, sono <span className="text-blue-400">Il Tuo Nome</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Sviluppatore Full Stack | Problem Solver | Tech Enthusiast
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full transition-colors text-white">
                Contattami
              </button>
            </div>
          </section>

          {/* About Section with backdrop */}
          <section id="about" className="min-h-screen flex items-center bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-20">
              <h2 className="text-3xl font-bold mb-8 text-white">Chi Sono</h2>
              <p className="text-gray-300 max-w-2xl">
                Qui puoi inserire una descrizione di te stesso e delle tue competenze.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-20">
              <h2 className="text-3xl font-bold mb-8 text-white">Esperienza</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white">Nome Azienda</h3>
                  <p className="text-gray-300">Ruolo</p>
                  <p className="text-gray-400">2020 - Presente</p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen flex items-center bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-20">
              <h2 className="text-3xl font-bold mb-8 text-white">Progetti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white">Nome Progetto</h3>
                  <p className="text-gray-300">Descrizione del progetto</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-20">
              <h2 className="text-3xl font-bold mb-8 text-white">Contattami</h2>
              <form className="max-w-lg mx-auto">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full p-3 bg-black/30 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 bg-black/30 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Messaggio"
                    rows={4}
                    className="w-full p-3 bg-black/30 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors text-white">
                  Invia Messaggio
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Portfolio;