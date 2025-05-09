import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUS from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <WhyChooseUS />
      <TestimonialsSection />
      <ContactForm />
    </div>
  );
}
