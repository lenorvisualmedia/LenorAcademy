import React from 'react';
import { AboutUsSection } from '../components/AboutUsSection';
import { InvestmentSection } from '../components/InvestmentSection';

interface AboutPageProps {
  onOpenEnrol: (programId?: string) => void;
  onOpenBrochure: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onOpenEnrol, 
  onOpenBrochure 
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Full Dedicated About Us Implementation from Design Mockup */}
      <AboutUsSection 
        onOpenEnrol={onOpenEnrol} 
        onOpenBrochure={onOpenBrochure} 
      />

      {/* The Investment & Programmes Section */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />
    </div>
  );
};

export default AboutPage;

