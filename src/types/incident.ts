
export type SeverityLevel = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  reportedDate: string;
}
