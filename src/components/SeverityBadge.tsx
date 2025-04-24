
import React from 'react';
import { SeverityLevel } from '../types/incident';

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const classes = {
    Low: 'severity-low',
    Medium: 'severity-medium',
    High: 'severity-high'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${classes[severity]}`}>
      {severity}
    </span>
  );
};

export default SeverityBadge;
