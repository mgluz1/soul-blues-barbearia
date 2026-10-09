import { useState } from 'react';
import { useRoute } from './utils/navigation';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Manifesto } from './components/Manifesto';
import { Services } from './components/Services';
import { PlansTeaser } from './components/PlansTeaser';
import { AppBooking } from './components/AppBooking';
import { SocialProof } from './components/SocialProof';
import { Gallery } from './components/Gallery';
import { CTA } from './components/CTA';
import { FinalCTA } from './components/FinalCTA';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { BookingModal } from './components/BookingModal';
import { PlansPage } from './pages/PlansPage';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { currentPath } = useRoute();
  const isPlansPage = currentPath === '/planos';
  return (
    <div className="relative min-h-screen bg-bg font-sans text-body selection:bg-gold/30 selection:text-ink">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      {isPlansPage ? (
        <main id="main-content">
          <PlansPage />
        </main>
      ) : (
        <main id="main-content">
          <Hero onOpenBooking={() => setIsBookingOpen(true)} />
          <Experience onOpenBooking={() => setIsBookingOpen(true)} />
          <Manifesto />
          <Services onOpenBooking={() => setIsBookingOpen(true)} />
          <PlansTeaser />
          <AppBooking onOpenBooking={() => setIsBookingOpen(true)} />
          <SocialProof />
          <Gallery onOpenBooking={() => setIsBookingOpen(true)} />
          <CTA onOpenBooking={() => setIsBookingOpen(true)} />
          <Location />
          <FinalCTA onOpenBooking={() => setIsBookingOpen(true)} />
        </main>
      )}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />
      {!isPlansPage && <MobileStickyCTA onOpenBooking={() => setIsBookingOpen(true)} />}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
