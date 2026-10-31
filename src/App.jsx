import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import { CatalogPage, GoneHomePage, PuppyPage } from './Puppies.jsx';
import HomePage from './pages/HomePage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';

function PageEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);

    if (pathname === '/puppies') document.title = 'Puppies looking for a family | Little Paws Dubai';
    else if (pathname === '/gone-home') document.title = 'Puppies who found homes | Little Paws Dubai';
    else if (pathname.startsWith('/puppies/')) document.title = 'Meet a puppy | Little Paws Dubai';
    else if (pathname === '/how-it-works') document.title = 'How it works | Little Paws Dubai';
    else document.title = 'Little Paws Dubai — Meet your new best friend';
  }, [pathname, hash]);

  return null;
}

function PawTrail() {
  const [paws, setPaws] = useState([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let lastPosition = null;
    let nextId = 0;
    const timeouts = new Set();

    function handlePointerMove(event) {
      if (lastPosition && Math.hypot(event.clientX - lastPosition.x, event.clientY - lastPosition.y) < 52) {
        return;
      }

      const paw = {
        id: nextId++,
        x: event.clientX,
        y: event.clientY,
        rotation: Math.round(Math.random() * 36 - 18),
      };
      lastPosition = paw;
      setPaws((currentPaws) => [...currentPaws.slice(-5), paw]);

      const timeout = window.setTimeout(() => {
        setPaws((currentPaws) => currentPaws.filter((item) => item.id !== paw.id));
        timeouts.delete(timeout);
      }, 700);
      timeouts.add(timeout);
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      timeouts.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div className="paw-trail" aria-hidden="true">
      {paws.map((paw) => (
        <img
          key={paw.id}
          src="/paw-cursor.svg"
          alt=""
          style={{ left: paw.x, top: paw.y, '--paw-rotation': `${paw.rotation}deg` }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <PageEffects />
      <PawTrail />
      <Header />
      <div className="page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puppies" element={<CatalogPage />} />
          <Route path="/puppies/:slug" element={<PuppyPage />} />
          <Route path="/gone-home" element={<GoneHomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route
            path="*"
            element={
              <main className="simple-page">
                <h1>Oh, paws.</h1>
                <p>We couldn't find that page.</p>
                <Link className="button button-dark" to="/">Back home</Link>
              </main>
            }
          />
        </Routes>
      </div>
    </>
  );
}
