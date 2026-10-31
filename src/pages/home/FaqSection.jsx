import { useState } from 'react';

const faqs = [
  [
    'How do I meet a puppy?',
    'Tell us a little about your home and what you are looking for. Our team will help arrange a relaxed visit in Dubai or share a video introduction.',
  ],
  [
    'Are puppies checked by a vet?',
    'Every puppy receives a veterinary health check and comes with the relevant records. We will walk you through the details before you make a decision.',
  ],
  [
    'Can you help after I bring my puppy home?',
    'Of course. We are here with practical guidance for settling in, feeding, and those first few exciting weeks together.',
  ],
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  function toggleFaq(index) {
    setOpenFaq((current) => current === index ? -1 : index);
  }

  return (
    <section className="section faq-section" id="faq">
      <div>
        <p className="eyebrow">A few good questions</p>
        <h2>Wondering<br /><em>about something?</em></h2>
        <p>We’d wonder too. Here are a few things families ask us.</p>
        <a className="text-link" href="#contact">Ask us anything <span>↗</span></a>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <article className="faq-item" key={question}>
            <button type="button" aria-expanded={openFaq === index} onClick={() => toggleFaq(index)}>
              <span>{question}</span><span>{openFaq === index ? '−' : '+'}</span>
            </button>
            {openFaq === index && <p>{answer}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
