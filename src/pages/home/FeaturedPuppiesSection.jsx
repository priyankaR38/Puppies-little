import { Link } from 'react-router-dom';
import PuppyCards from '../../components/puppies/PuppyCards.jsx';

export default function FeaturedPuppiesSection({ puppies, status, error }) {
  return (
    <section className="section featured-section" id="puppies">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Real photos, real little personalities</p>
          <h2>Meet the <em>puppies</em></h2>
          <p className="heading-description">Get to know the little faces looking for their forever families.</p>
        </div>
        <Link className="button button-dark section-cta" to="/puppies">
          See all available puppies <span>↗</span>
        </Link>
      </div>
      {status === 'failed' && <p className="inline-error" role="alert">{error}</p>}
      {status === 'loading' && <p className="loading-note">Fetching the latest little faces…</p>}
      {status === 'succeeded' && <PuppyCards puppies={puppies} />}
      <p className="section-footnote">
        Every puppy has their own personality. We’ll help you find the one that feels like yours.
      </p>
    </section>
  );
}
