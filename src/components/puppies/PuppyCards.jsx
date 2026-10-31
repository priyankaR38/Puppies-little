import { Link } from 'react-router-dom';

export default function PuppyCards({ puppies }) {
  return (
    <div className="puppy-grid">
      {puppies.map((puppy) => (
        <Link className="puppy-card" key={puppy.slug} to={`/puppies/${puppy.slug}`}>
          <div className="puppy-card-heading">
            <h3>{puppy.name}</h3>
            <span>{puppy.breed} · {puppy.gender.toLowerCase()}, {puppy.age_months} months</span>
          </div>
          <div className="puppy-photo">
            <img src={puppy.image_url} alt={`${puppy.name}, ${puppy.breed} puppy`} loading="lazy" />
            <span className="availability">{puppy.location === 'Dubai' ? 'Available' : 'Coming soon'}</span>
            <span className="card-arrow">↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
