import React from 'react';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Services } from '../components/home/Services';
import { HowItWorks } from '../components/home/HowItWorks';
import { Features } from '../components/home/Features';
import { Testimonials } from '../components/home/Testimonials';
import { ContactForm } from '../components/home/ContactForm';

export function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Features />
      <Testimonials />
      <ContactForm />
    </div>
  );
}