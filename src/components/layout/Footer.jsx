import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand brand-footer" to="/">
          <span className="brand-mark">lp</span>
          <span>little paws<small>DUBAI</small></span>
        </Link>
        <p>Little companions.<br />A lifetime of love.</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/puppies">Meet the puppies</Link>
          <Link to="/how-it-works">How it works</Link>
          <a href="/#faq">FAQs</a>
          <a href="mailto:hello@littlepawsdubai.example">Say hello</a>
        </nav>
        <a href="https://instagram.com" className="footer-social">Follow along ↗</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Little Paws Dubai. Made with care.</span>
        <span>Dubai, United Arab Emirates</span>
      </div>
    </footer>
  );
}
