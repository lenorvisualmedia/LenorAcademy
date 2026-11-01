import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { CameraFlashTransition } from './components/CameraFlashTransition';
import { PageTransition } from './components/PageTransition';
import { EnrolModal } from './components/EnrolModal';
import { BrochureModal } from './components/BrochureModal';

import { HomePage } from './pages/HomePage';
import { PlacementPage } from './pages/PlacementPage';
import { EventsPage } from './pages/EventsPage';
import { BlogPage } from './pages/BlogPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { CareersPage } from './pages/CareersPage';

export function App() {
  const [enrolOpen, setEnrolOpen] = useState(false);
  const [enrolProgramId, setEnrolProgramId] = useState<string | undefined>(undefined);
  const [brochureOpen, setBrochureOpen] = useState(false);

  const handleOpenEnrol = (programId?: string) => {
    setEnrolProgramId(programId);
    setEnrolOpen(true);
  };

  const handleOpenBrochure = () => {
    setBrochureOpen(true);
  };

  return (
    <BrowserRouter>
      <SmoothScroll>
        <CameraFlashTransition />
        <ScrollToTop />
      
      {/* Global Modals */}
      <EnrolModal
        isOpen={enrolOpen}
        onClose={() => setEnrolOpen(false)}
        defaultProgramId={enrolProgramId}
      />
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
        {/* Navigation Bar */}
        <Navbar
          onOpenEnrol={() => handleOpenEnrol('media-master')}
          onOpenBrochure={handleOpenBrochure}
        />

        {/* Page Content Container */}
        <main className="flex-1 w-full flex flex-col">
          <PageTransition>
            <Routes>
              <Route
              path="/"
              element={
                <HomePage
                  onOpenEnrol={handleOpenEnrol}
                  onOpenBrochure={handleOpenBrochure}
                />
              }
            />
            <Route
              path="/placement"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <PlacementPage
                    onOpenEnrol={() => handleOpenEnrol('media-master')}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            <Route
              path="/events"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <EventsPage
                    onOpenEnrol={() => handleOpenEnrol('media-master')}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            <Route
              path="/blog"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <BlogPage
                    onOpenEnrol={() => handleOpenEnrol('media-master')}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            <Route
              path="/campaigns"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <CampaignsPage
                    onOpenEnrol={handleOpenEnrol}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            <Route
              path="/success-stories"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <SuccessStoriesPage
                    onOpenEnrol={() => handleOpenEnrol('media-master')}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            <Route
              path="/careers"
              element={
                <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                  <CareersPage
                    onOpenEnrol={() => handleOpenEnrol('media-master')}
                    onOpenBrochure={handleOpenBrochure}
                  />
                </div>
              }
            />
            {/* Fallback route */}
            <Route
              path="*"
              element={
                <HomePage
                  onOpenEnrol={handleOpenEnrol}
                  onOpenBrochure={handleOpenBrochure}
                />
              }
            />
            </Routes>
          </PageTransition>
        </main>

        {/* Global Footer */}
        <Footer
          onOpenBrochure={handleOpenBrochure}
          onOpenEnrol={() => handleOpenEnrol('media-master')}
        />
      </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;

