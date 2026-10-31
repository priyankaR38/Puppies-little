import Footer from '../components/layout/Footer.jsx';

const steps = [
  {
    number: '01',
    title: 'Start with a chat',
    description: 'Tell us about your home, your routine, and the kind of companion you are hoping to welcome.',
  },
  {
    number: '02',
    title: 'Meet your match',
    description: 'We’ll introduce you to puppies whose needs and personalities may fit your life. Ask us anything.',
  },
  {
    number: '03',
    title: 'Take your time',
    description: 'Meet in Dubai or connect by video. We want you to feel comfortable and informed.',
  },
  {
    number: '04',
    title: 'Get ready for home',
    description: 'We’ll share practical tips and help make those first days together feel calm and happy.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <main className="simple-page">
        <p className="eyebrow">A little care goes a long way</p>
        <h1>From first hello<br /><em>to forever.</em></h1>
        <p className="simple-lead">
          We make finding your new companion feel thoughtful and clear. No rush, no pressure — just
          the support you need.
        </p>
        <div className="how-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <a className="button button-dark" href="/#contact">Start a conversation <span>↗</span></a>
      </main>
      <Footer />
    </>
  );
}
