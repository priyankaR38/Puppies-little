import { Link } from 'react-router-dom';

export default function WaysToMeetSection() {
  return (
    <section className="section ways-section">
      <div className="center-heading">
        <p className="eyebrow">However you meet</p>
        <h2>There’s more than<br /><em>one way to say hello.</em></h2>
        <p>We’ll help you make the first meeting just right.</p>
      </div>
      <div className="ways-grid">
        <article className="way-card way-local">
          <span className="way-number">01</span>
          <p className="eyebrow">Hello, Dubai</p>
          <h3>Come meet them<br />in person.</h3>
          <p>Slow down, spend a little time together, and see if it feels like a match at our Dubai space.</p>
          <Link className="text-link" to="/puppies?location=Dubai">See puppies in Dubai <span>↗</span></Link>
          <span className="way-doodle">✳</span>
        </article>
        <article className="way-card way-remote">
          <span className="way-number">02</span>
          <p className="eyebrow">From near or far</p>
          <h3>A little hello<br />from anywhere.</h3>
          <p>Can’t make it in person? We’ll arrange a video hello and help you get to know your new friend.</p>
          <a className="text-link" href="#contact">Ask us how <span>↗</span></a>
          <span className="way-doodle">♡</span>
        </article>
      </div>
    </section>
  );
}
