import { homePhotos } from './homePhotos.js';

const whatsappUrl = 'https://wa.me/971500000000?text=Hi%20Little%20Paws%2C%20I%27d%20love%20to%20meet%20the%20puppies.';

export default function ContactSection() {
  return (
    <section className="contact-banner" id="contact">
      <div>
        <p className="eyebrow">Your next chapter is a hello away</p>
        <h2>Ready for a little<br /><em>more love?</em></h2>
        <p>Tell us what you’re dreaming of. We’d love to meet you.</p>
        <a className="button button-dark" href={whatsappUrl}>Let’s have a chat <span>↗</span></a>
      </div>
      <div className="contact-image">
        <img src={homePhotos.hero} alt="A sweet puppy ready to meet a new family" loading="lazy" />
        <span>we saved<br />you a cuddle</span>
      </div>
    </section>
  );
}
