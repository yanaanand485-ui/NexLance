import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { MetricsBar } from '../components/landing/MetricsBar';
import { Differentiators } from '../components/landing/Differentiators';
import { SmartMatchDemo } from '../components/landing/SmartMatchDemo';
import { CTASection } from '../components/landing/CTASection';

export const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <MetricsBar />
      <Differentiators />
      <SmartMatchDemo />
      <CTASection />
    </main>
  );
};
