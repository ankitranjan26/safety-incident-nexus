
import React, { useState } from 'react';
import { Incident } from '../types/incident';
import SeverityBadge from './SeverityBadge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };
  
  const formattedDate = new Date(incident.reportedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-card rounded-lg p-4 shadow card-hover border">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{incident.title}</h3>
        <SeverityBadge severity={incident.severity} />
      </div>
      
      <div className="text-sm text-foreground/70 mb-3">
        Reported: {formattedDate}
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleDetails} 
        className="flex items-center text-sm w-full justify-between"
      >
        <span>View {showDetails ? 'Less' : 'Details'}</span>
        {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>
      
      {showDetails && (
        <div className="mt-3 text-sm border-t pt-3 animate-accordion-down">
          {incident.description}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
