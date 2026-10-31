import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoneHomePuppies, fetchPuppies, fetchPuppyBySlug, resetInquiry, sendInquiry } from './store.js';

function InquiryForm({ puppy, close, inline = false }) {
  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.inquiries);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    message: puppy ? `Hi! I'd love to know more about ${puppy.breed}.` : '',
  });
  useEffect(() => () => dispatch(resetInquiry()), [dispatch]);
  function submit(event) {
    event.preventDefault();
    dispatch(sendInquiry({ ...form, puppyId: puppy?.id || null }));
  }
  const content = <>
    {!inline && <button className="modal-close" aria-label="Close enquiry form" onClick={close}>×</button>}
    <p className="eyebrow">A friendly first hello</p>
    <h2 id={inline ? undefined : 'inquiry-heading'}>Ask about <em>{puppy?.breed || puppiesLabel}.</em></h2>
    <p>Leave your details and we’ll get back to you. Your phone number is the only contact detail we need.</p>
    {status === 'succeeded' ? <div className="success-message" role="status"><span>♡</span><h3>Message received!</h3><p>{message}</p>{!inline && <button className="button button-dark" onClick={close}>Lovely, thanks</button>}</div> : (
      <form onSubmit={submit} className="inquiry-form">
        <label>Your name *<input required minLength="2" maxLength="120" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
        <label>Phone or WhatsApp *<input required type="tel" minLength="5" maxLength="40" placeholder="+971 50 123 4567" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /><small>With country code, e.g. +971 50 123 4567</small></label>
        <label>Email (optional)<input type="email" maxLength="190" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Your area (optional)<input maxLength="120" placeholder="e.g. Dubai Marina" value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} /></label>
        <label className="inquiry-message">Message (optional)<textarea maxLength="2000" rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
        {error && <p className="inline-error" role="alert">{error}</p>}
        <button className="button button-dark" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send enquiry'} <span>↗</span></button>
      </form>
    )}
  </>;
  if (inline) return <section className="detail-enquiry" aria-labelledby="detail-enquiry-heading">
    <div className="detail-enquiry-intro">
      <p className="detail-step-label"><span>4</span> a little hello</p>
      <h2 id="detail-enquiry-heading">Ask about this puppy</h2>
      <p>Leave your details and our team will get back to you. For the quickest reply, message us on WhatsApp.</p>
      <a className="button button-light" href={`https://wa.me/971500000000?text=${encodeURIComponent(`Hi Little Paws! I'd love to know more about ${puppy?.breed}: ${window.location.origin}/puppies/${puppy?.slug}`)}`} target="_blank" rel="noreferrer">Message us on WhatsApp <span>↗</span></a>
    </div>
    <div className="detail-enquiry-form">{content}</div>
  </section>;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-heading">{content}</section></div>;
}

const puppiesLabel = 'with you';
const breeds = ['Cavapoo', 'Maltipoo', 'Pomeranian', 'Shih Tzu', 'Toy Poodle'];

export function CatalogPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { items, goneHome, status, error } = useSelector((state) => state.puppies);
  const params = new URLSearchParams(location.search);
  const origin = params.get('origin') || '';
  const collection = params.get('collection') || '';
  const breed = params.get('breed') || '';
  const gender = params.get('gender') || '';
  const [enquire, setEnquire] = useState(false);
  useEffect(() => {
    dispatch(fetchPuppies({ origin, collection, breed, gender }));
  }, [dispatch, location.search]);
  useEffect(() => { dispatch(fetchGoneHomePuppies()); }, [dispatch]);
  function choose(key, value) {
    const next = new URLSearchParams(location.search);
    if (key === 'origin' && value === 'local') {
      next.delete('origin');
      next.delete('collection');
    } else if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    if (key === 'origin' && value === 'imported') next.delete('collection');
    navigate({ pathname: '/puppies', search: next.toString() ? `?${next}` : '' });
  }
  function clearFilters() {
    navigate('/puppies');
  }
  return <>
    <main className="catalog-page">
      <section className="catalog-intro" aria-labelledby="catalog-title">
        <div className="catalog-title-copy">
          <p className="handwritten-eyebrow">from our little sketchbook</p>
          <h1 id="catalog-title">Puppies looking<br />for <em>their people.</em></h1>
          <span className="title-underline" aria-hidden="true" />
          <p className="catalog-lead">Meet the puppies and explore their profiles. When someone catches your eye, we’ll be happy to answer your questions.</p>
        </div>
        <div className="catalog-mascot"><img src="/puppy-sketch.svg" alt="An original puppy illustration" /><span>little hello!</span></div>
      </section>
      <section className="puppy-filters" aria-label="Filter available puppies">
        <div className="filter-row"><p>where</p><div className="filter-options"><button className={(!origin || origin === 'local') && !collection ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={(!origin || origin === 'local') && !collection} onClick={() => choose('origin', 'local')}>Everywhere</button><button className={origin === 'imported' ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={origin === 'imported'} onClick={() => choose('origin', 'imported')}>From abroad</button><button className={collection === 'korean-teacup' ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={collection === 'korean-teacup'} onClick={() => { const next = new URLSearchParams(location.search); next.set('origin', 'imported'); next.set('collection', 'korean-teacup'); navigate({ pathname: '/puppies', search: `?${next}` }); }}>Korean teacup</button></div></div>
        <div className="filter-row"><p>breed</p><div className="filter-options">{['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((option) => <button key={option} className={breed.toLowerCase() === option.toLowerCase() ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={breed.toLowerCase() === option.toLowerCase()} onClick={() => choose('breed', option.toLowerCase())}>{option}</button>)}</div></div>
        <div className="filter-row"><p>boy or girl</p><div className="filter-options">{[['boy', 'Boys'], ['girl', 'Girls']].map(([value, label]) => <button key={value} className={gender === value ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={gender === value} onClick={() => choose('gender', value)}>{label}</button>)}{(origin || collection || breed || gender) && <button className="clear-filters" onClick={clearFilters}>Clear filters <span>×</span></button>}</div></div>
      </section>
      <div className="results-heading"><p>{status === 'loading' ? 'Finding your little match…' : `${items.length} ${items.length === 1 ? 'little friend' : 'little friends'} to meet`}</p><span>Choose a face to open their story ↗</span></div>
      {status === 'failed' && <p className="inline-error" role="alert">{error}</p>}
      {status === 'loading' && <div className="catalog-loading" aria-label="Loading puppies"><span /><span /><span /></div>}
      {status === 'succeeded' && (items.length ? <PuppyCardsForCatalog puppies={items} /> : <div className="empty-state"><span>♡</span><h2>No little faces just yet.</h2><p>Try another filter, or start a conversation to tell us what you’re looking for.</p><button className="button button-dark" onClick={() => setEnquire(true)}>Ask us to help <span>↗</span></button></div>)}
      <section className="gone-home-section">
        <div className="section-heading"><div><p className="handwritten-eyebrow">a little look back</p><h2>Found their <em>forever.</em></h2><p className="heading-description">These sweet faces have already headed home to their families.</p></div><Link className="text-link" to="/gone-home">See their stories <span>↗</span></Link></div>
        <PuppyCardsForCatalog puppies={goneHome} goneHome />
      </section>
    </main>
    <FooterForCatalog />
    {enquire && <InquiryForm close={() => setEnquire(false)} />}
  </>;
}

function PuppyCardsForCatalog({ puppies, goneHome = false }) {
  return <div className="puppy-grid catalog-grid">{puppies.map((puppy, index) => <Link className={`puppy-card ${goneHome ? 'is-gone-home' : ''}`} key={puppy.slug} to={`/puppies/${puppy.slug}`} style={{ '--card-index': index }}><div className="puppy-card-heading"><h3>{puppy.name}</h3><span>{puppy.breed} · {puppy.gender.toLowerCase()}, {puppy.age_months} months</span></div><div className="puppy-photo"><img src={puppy.image_url} alt={`${puppy.name}, ${puppy.breed} puppy`} loading="lazy" /><span className="availability">{goneHome ? 'Found a home' : puppy.location === 'Dubai' ? 'Available' : 'Coming soon'}</span><span className="card-arrow">↗</span></div></Link>)}</div>;
}

function FooterForCatalog() {
  return <footer className="site-footer catalog-footer"><div className="footer-main"><Link className="brand brand-footer" to="/"><span className="brand-mark">lp</span><span>little paws<small>DUBAI</small></span></Link><p>Little companions.<br />A lifetime of love.</p><nav className="footer-links" aria-label="Footer navigation"><Link to="/puppies">Available puppies</Link><Link to="/gone-home">Found their forever</Link><Link to="/how-it-works">How it works</Link><Link to="/#faq">FAQs</Link><Link to="/#contact">Visit & contact</Link></nav><div className="footer-contact"><strong>Say hello</strong><span>Dubai, United Arab Emirates</span><a href="mailto:hello@littlepawsdubai.example">Send us a note ↗</a></div></div><div className="footer-bottom"><span>© 2026 Little Paws Dubai. Made with care.</span><span>every little paw belongs</span></div></footer>;
}

export function GoneHomePage() {
  const dispatch = useDispatch();
  const { goneHome, error } = useSelector((state) => state.puppies);
  useEffect(() => { dispatch(fetchGoneHomePuppies()); }, [dispatch]);
  return <><main className="catalog-page gone-home-page"><section className="catalog-intro"><div className="catalog-title-copy"><p className="handwritten-eyebrow">a little look back</p><h1>Found their<br /><em>forever.</em></h1><span className="title-underline" /><p className="catalog-lead">A few familiar faces who found their people and headed home to begin a new chapter.</p></div><div className="catalog-mascot"><img src="/puppy-sketch.svg" alt="An original puppy illustration" /><span>home safe!</span></div></section>{error && <p className="inline-error" role="alert">{error}</p>}<PuppyCardsForCatalog puppies={goneHome} goneHome /></main><FooterForCatalog /></>;
}

export function PuppyPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { selected: puppy, selectedStatus: status, error } = useSelector((state) => state.puppies);
  useEffect(() => { dispatch(fetchPuppyBySlug(slug)); }, [dispatch, slug]);
  useLayoutEffect(() => {
    if (status !== 'succeeded' || !location.hash) return undefined;
    let frame = 0;
    let attempts = 0;
    const scrollToEnquiry = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts < 10) {
        attempts += 1;
        frame = window.requestAnimationFrame(scrollToEnquiry);
      }
    };
    frame = window.requestAnimationFrame(scrollToEnquiry);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, puppy, status]);
  if (status === 'failed') return <main className="simple-page"><p className="inline-error" role="alert">{error}</p><Link to="/puppies">Back to all puppies</Link></main>;
  if (status !== 'succeeded' || !puppy) return <main className="simple-page"><p className="loading-note">A little moment while we find this face…</p><Link to="/puppies">Meet all puppies ↗</Link></main>;
  const photos = puppy.photo_urls?.length ? puppy.photo_urls : [puppy.image_url];
  const enquiryId = `enquire-${puppy.slug}`;
  return <>
    <main className="puppy-profile">
      <div className="profile-steps">
        <nav className="profile-breadcrumb" aria-label="Breadcrumb"><Link to="/puppies">Available puppies</Link><span>/ {puppy.breed}</span></nav>
        <p className="detail-step-label"><span>1</span> hello, it’s me</p>
      </div>
      <section className="puppy-detail">
        <PhotoGallery puppy={puppy} photos={photos} />
        <div className="detail-copy">
          <div className="detail-badge"><span aria-hidden="true">✦</span> {puppy.location === 'Dubai' ? 'Available in Dubai' : 'Available soon'}</div>
          <h1>{puppy.breed}</h1>
          <dl className="detail-facts">
            <div><dt>Breed</dt><dd>{puppy.breed}</dd></div>
            <div><dt>Boy or girl</dt><dd>{puppy.gender}</dd></div>
            <div><dt>Age</dt><dd>{puppy.age_months} months</dd></div>
            <div><dt>Where</dt><dd>{puppy.location === 'Dubai' ? 'In Dubai' : 'Imported for you'}</dd></div>
          </dl>
          <p className="detail-description">{puppy.description}</p>
          <div className="detail-actions">
            <a className="button button-dark" href={`https://wa.me/971500000000?text=${encodeURIComponent(`Hi Little Paws! I'm interested in the ${puppy.breed} (${puppy.gender.toLowerCase()}): ${window.location.origin}/puppies/${puppy.slug}`)}`} target="_blank" rel="noreferrer">Ask on WhatsApp <span>↗</span></a>
            <a className="button button-outline" href={`#${enquiryId}`}>Send an enquiry <span>↓</span></a>
          </div>
        </div>
      </section>
      <section className="profile-care">
        <p className="detail-step-label"><span>2</span> what comes with this {puppy.breed}</p>
        <h2>Every puppy comes<br /><em>with thoughtful care.</em></h2>
        <ul className="care-list">
          <li><span>✦</span> Vaccinated</li>
          <li><span>✦</span> Dewormed</li>
          <li><span>✦</span> Verified health certificate from licensed vets</li>
          <li><span>✦</span> Thoroughly checked before joining your family</li>
        </ul>
      </section>
      <section className="profile-arrival">
        <p className="detail-step-label"><span>3</span> the way home</p>
        <h2>Coming home<br /><em>from abroad.</em></h2>
        <ol className="arrival-steps">
          <li><span>1</span><div><h3>Tell us what you’re looking for</h3><p>Share a little about your family and what matters most in a companion.</p></div></li>
          <li><span>2</span><div><h3>Get to know your puppy</h3><p>We’ll share the details and answer your questions so you can take your time.</p></div></li>
          <li><span>3</span><div><h3>Prepare for the journey</h3><p>Our team coordinates health checks, travel arrangements, and documentation.</p></div></li>
          <li><span>4</span><div><h3>Welcome your new friend</h3><p>We’ll help make the first days together feel calm, supported, and happy.</p></div></li>
        </ol>
      </section>
      <div id={enquiryId} className="profile-enquiry-anchor"><InquiryForm puppy={puppy} inline /></div>
    </main>
    <FooterForCatalog />
  </>;
}

function PhotoGallery({ puppy, photos }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const changePhoto = (offset) => setActivePhoto((current) => (current + offset + photos.length) % photos.length);
  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [lightboxOpen]);
  return <>
    <div className="detail-gallery">
    <div className="detail-gallery-main">
      <button className="gallery-open" type="button" aria-label={`Open ${puppy.breed}, photo ${activePhoto + 1} of ${photos.length} full screen`} onClick={() => setLightboxOpen(true)}>
        <img src={photos[activePhoto]} alt={`${puppy.gender} ${puppy.breed} puppy`} />
      </button>
      {photos.length > 1 && <div className="gallery-controls"><button type="button" aria-label="Previous photo" onClick={() => changePhoto(-1)}>‹</button><span>{activePhoto + 1} / {photos.length}</span><button type="button" aria-label="Next photo" onClick={() => changePhoto(1)}>›</button></div>}
    </div>
    {photos.length > 1 && <div className="gallery-thumbnails" role="list" aria-label={`All photos of ${puppy.breed}`}>{photos.map((photo, index) => <button type="button" role="listitem" key={photo} aria-label={`${puppy.breed}, photo ${index + 1} of ${photos.length}`} aria-pressed={activePhoto === index} onClick={() => setActivePhoto(index)}><img src={photo} alt="" loading="lazy" /></button>)}</div>}
    </div>
    {lightboxOpen && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${puppy.breed} photos`} onClick={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }}>
      <button className="lightbox-close" type="button" aria-label="Close full-screen photo" onClick={() => setLightboxOpen(false)}>×</button>
      {photos.length > 1 && <button className="lightbox-prev" type="button" aria-label="Previous photo" onClick={() => changePhoto(-1)}>‹</button>}
      <img src={photos[activePhoto]} alt={`${puppy.gender} ${puppy.breed} puppy, photo ${activePhoto + 1} of ${photos.length}`} />
      {photos.length > 1 && <button className="lightbox-next" type="button" aria-label="Next photo" onClick={() => changePhoto(1)}>›</button>}
    </div>}
  </>;
}
