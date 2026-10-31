import { Link } from 'react-router-dom';
import { homePhotos } from './homePhotos.js';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-star">✳</span> A good kind of forever</p>
        <h1>Tiny pups.<br /><em>Huge hearts.</em></h1>
        <p className="hero-description">
          Meet your new best friend at our Dubai puppy boutique, or ask us to help find a tiny
          companion that feels just right for your family.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/puppies">See available puppies <span>↗</span></Link>
          <a className="text-link" href="#journey">Get to know us <span>↓</span></a>
        </div>
        <div className="hero-proof">
          <span className="proof-avatars">☺ ☺ ☺</span>
          <span><b>Made for happy beginnings</b><br />Personal help, every step of the way</span>
        </div>
        <span className="hero-scribble">your new<br />best friend</span>
      </div>
      <div className="hero-visual">
        <img src={homePhotos.hero} alt="A fluffy golden puppy enjoying a sunny afternoon" />
        <div className="hero-sticker"><span>♡</span><br />here for<br />the cuddles</div>
        <div className="hero-caption"><span>01 / 06</span><span>Say hello to your next chapter</span></div>
      </div>
      <div className="hero-side-note">GOOD THINGS COME IN LITTLE PACKAGES</div>
    </section>
  );
}
