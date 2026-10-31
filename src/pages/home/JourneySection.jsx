import { Link } from 'react-router-dom';

const journeySteps = [
  {
    number: '01',
    title: 'Tell us what feels like you',
    description: 'The kind of home you have, the pace of your days, and all the things you are hoping for.',
  },
  {
    number: '02',
    title: 'Get to know a little face',
    description: 'We will share honest details, photos, and videos so you can meet them at your own pace.',
  },
  {
    number: '03',
    title: 'Make room for the good stuff',
    description: 'When it feels right, we help you prepare for a calm, happy first day at home.',
  },
];

export default function JourneySection() {
  return (
    <section className="journey-section" id="journey">
      <div className="journey-intro">
        <p className="eyebrow">No rush. No guesswork.</p>
        <h2>Your happy<br /><em>little journey.</em></h2>
        <p>Good things happen when everyone feels comfortable. We’ll be right here to help.</p>
        <Link className="button button-light" to="/how-it-works">How it works <span>↗</span></Link>
        <div className="journey-flower">✿</div>
      </div>
      <div className="journey-steps">
        {journeySteps.map((step) => (
          <article className="journey-step" key={step.number}>
            <span>{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
            <span className="step-plus">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
