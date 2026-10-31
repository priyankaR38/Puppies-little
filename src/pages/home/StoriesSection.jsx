import { homePhotos } from './homePhotos.js';

export default function StoriesSection() {
  return (
    <section className="section stories-section">
      <div className="story-image">
        <img src={homePhotos.story} alt="Two joyful dogs playing together" loading="lazy" />
        <span className="story-image-sticker">The<br />goodest<br />days ♡</span>
      </div>
      <div className="story-copy">
        <p className="eyebrow">Notes from new best friends</p>
        <h2>“It felt like they<br />already <em>knew us.”</em></h2>
        <p>
          From our first conversation to that first sleepy evening at home, everything felt
          thoughtful and kind. Our little girl has made every day brighter.
        </p>
        <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <b className="review-name">Maya & family <span>· Dubai</span></b>
        <div className="story-count">01 <span>/</span> 04 <i>← &nbsp; →</i></div>
      </div>
    </section>
  );
}
