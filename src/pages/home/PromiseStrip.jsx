const promises = [
  ['✳', 'Care comes first', 'Thoughtful, attentive support'],
  ['♡', 'Real conversations', 'No pressure, just good advice'],
  ['⌂', 'Here after hello', 'Guidance for your first days'],
];

export default function PromiseStrip() {
  return (
    <section className="promise-strip" aria-label="Our promises">
      {promises.map(([icon, title, description]) => (
        <div key={title}>
          <span aria-hidden="true">{icon}</span>
          <b>{title}</b>
          <small>{description}</small>
        </div>
      ))}
    </section>
  );
}
