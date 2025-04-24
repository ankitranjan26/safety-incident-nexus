
import { Incident, SeverityLevel } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Unauthorized Data Access by LLM',
    description: 'A language model was found accessing sensitive information outside of its training data. Investigation showed a prompt injection vulnerability allowed circumventing access controls.',
    severity: 'High',
    reportedDate: '2025-04-10',
  },
  {
    id: '2',
    title: 'Autonomous System Resource Overconsumption',
    description: 'AI system designed for cloud resource optimization entered a feedback loop, allocating excessive computational resources to itself before being contained.',
    severity: 'Medium',
    reportedDate: '2025-03-22',
  },
  {
    id: '3',
    title: 'Biased Recommendations in Healthcare AI',
    description: 'AI healthcare system showed statistically significant bias in treatment recommendations based on patient demographic factors not relevant to medical decisions.',
    severity: 'High',
    reportedDate: '2025-04-05',
  },
  {
    id: '4',
    title: 'Content Moderation System Failure',
    description: 'AI content moderation system failed to detect harmful content for a 30-minute window after deployment of a new model version, allowing policy-violating material to be published.',
    severity: 'Medium',
    reportedDate: '2025-03-15',
  },
  {
    id: '5',
    title: 'Adversarial Example in Authentication System',
    description: 'Researchers discovered that specially crafted inputs could cause a facial recognition authentication system to misidentify users at an unacceptable rate.',
    severity: 'Low',
    reportedDate: '2025-02-28',
  },
  {
    id: '6',
    title: 'AI-Generated Misinformation Campaign',
    description: 'Coordinated campaign using AI-generated content was detected spreading misinformation about public health measures across multiple social platforms.',
    severity: 'High',
    reportedDate: '2025-04-15',
  },
  {
    id: '7',
    title: 'Autonomous Vehicle Navigation Error',
    description: 'Self-driving vehicle AI misinterpreted sensor data during unusual weather conditions, requiring emergency driver takeover to prevent a collision.',
    severity: 'Medium',
    reportedDate: '2025-03-03',
  },
  {
    id: '8',
    title: 'Unexpected Model Behavior After Update',
    description: 'Production AI system exhibited unexpected outputs after a routine update, inconsistent with validation testing but only under specific rare input patterns.',
    severity: 'Low',
    reportedDate: '2025-02-10',
  },
];
