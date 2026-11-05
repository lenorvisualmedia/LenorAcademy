import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { CameraFlashTransition } from './components/CameraFlashTransition';
import { PageTransition } from './components/PageTransition';

// Route-level code splitting: pages load on demand, dramatically reducing initial JS bundle
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const PlacementPage = lazy(() => import('./pages/PlacementPage').then(m => ({ default: m.PlacementPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const CampaignsPage = lazy(() => import('./pages/CampaignsPage').then(m => ({ default: m.CampaignsPage })));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage').then(m => ({ default: m.SuccessStoriesPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));

// Lazy-load heavy modals so their JS is only fetched when opened
const EnrolModal = lazy(() => import('./components/EnrolModal').then(m => ({ default: m.EnrolModal })));
const BrochureModal = lazy(() => import('./components/BrochureModal').then(m => ({ default: m.BrochureModal })));

// Minimal non-blocking fallback for route transitions
const RouteFallback: React.FC = () => (
  <div className="w-full min-h-[50vh] bg-black flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  </div>
);

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

        {/* Global Modals - loaded on demand */}
        {enrolOpen && (
          <Suspense fallback={null}>
            <EnrolModal
              isOpen={enrolOpen}
              onClose={() => setEnrolOpen(false)}
              defaultProgramId={enrolProgramId}
            />
          </Suspense>
        )}
        {brochureOpen && (
          <Suspense fallback={null}>
            <BrochureModal
              isOpen={brochureOpen}
              onClose={() => setBrochureOpen(false)}
            />
          </Suspense>
        )}

        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
          {/* Navigation Bar */}
          <Navbar
            onOpenEnrol={() => handleOpenEnrol('media-master')}
            onOpenBrochure={handleOpenBrochure}
          />

          {/* Page Content Container */}
          <main className="flex-1 w-full flex flex-col">
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
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
                    path="/about"
                    element={
                      <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 pt-24 pb-8">
                        <AboutPage
                          onOpenEnrol={handleOpenEnrol}
                          onOpenBrochure={handleOpenBrochure}
                        />
                      </div>
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
              </Suspense>
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
