import React from 'react';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { InvestmentSection } from '../components/InvestmentSection';

interface FacilitiesPageProps {
  onOpenEnrol: (programId?: string) => void;
  onOpenBrochure: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ 
  onOpenEnrol, 
  onOpenBrochure 
}) => {
  return (
    <div className="w-full bg-black space-y-16 sm:space-y-24">
      {/* Full Dedicated Facilities Implementation from Design Mockup */}
      <FacilitiesSection 
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

export default FacilitiesPage;

