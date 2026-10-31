import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPuppies } from '../store.js';
import Footer from '../components/layout/Footer.jsx';
import ContactSection from './home/ContactSection.jsx';
import FaqSection from './home/FaqSection.jsx';
import FeaturedPuppiesSection from './home/FeaturedPuppiesSection.jsx';
import HeroSection from './home/HeroSection.jsx';
import JourneySection from './home/JourneySection.jsx';
import PromiseStrip from './home/PromiseStrip.jsx';
import StoriesSection from './home/StoriesSection.jsx';
import WaysToMeetSection from './home/WaysToMeetSection.jsx';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.puppies);

  useEffect(() => {
    dispatch(fetchPuppies());
  }, [dispatch]);

  return (
    <div className="home-page">
      <main id="main">
        <HeroSection />
        <FeaturedPuppiesSection puppies={items.slice(0, 16)} status={status} error={error} />
        <WaysToMeetSection />
        <JourneySection />
        <PromiseStrip />
        <StoriesSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
