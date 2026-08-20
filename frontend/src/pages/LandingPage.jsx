import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { MetricsBar } from '../components/landing/MetricsBar';
import { Differentiators } from '../components/landing/Differentiators';
import { FeaturedServices } from '../components/landing/FeaturedServices';
import { SmartMatchDemo } from '../components/landing/SmartMatchDemo';
import { CTASection } from '../components/landing/CTASection';

export const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <MetricsBar />
      <Differentiators />
      <FeaturedServices />
      <SmartMatchDemo />
      <CTASection />
    </main>
  );
};
