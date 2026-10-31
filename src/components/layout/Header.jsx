import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="topline">
        A little more love, delivered across Dubai <span>✦</span> Thoughtful puppy matching
      </div>
      <div className="nav-wrap">
        <Link className="brand" to="/" aria-label="Little Paws Dubai home" onClick={closeMenu}>
          <span className="brand-mark">lp</span>
          <span>little paws<small>DUBAI</small></span>
        </Link>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link to="/puppies" onClick={closeMenu}>Our puppies</Link>
          <a href="/#journey" onClick={closeMenu}>Our story</a>
          <Link to="/how-it-works" onClick={closeMenu}>How it works</Link>
          <a href="/#faq" onClick={closeMenu}>FAQs</a>
        </nav>
        <a className="button button-dark nav-cta" href="/#contact">Let’s chat <span>↗</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'} <span>☰</span>
        </button>
      </div>
    </header>
  );
}
