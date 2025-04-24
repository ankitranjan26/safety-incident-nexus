
import React, { useState } from 'react';
import { SeverityLevel } from '../types/incident';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/ui/theme-provider';

interface IncidentFormProps {
  onAddIncident: (title: string, description: string, severity: SeverityLevel) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onAddIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    onAddIncident(title, description, severity);
    
    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('Medium');
    
    toast({
      title: "Incident Reported",
      description: "Your incident has been successfully added to the dashboard"
    });
  };

  const getSeverityButtonClass = (level: SeverityLevel) => {
    if (severity !== level) return '';
    
    switch(level) {
      case 'Low': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'High': return 'bg-destructive text-destructive-foreground';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Report New Incident</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Concise incident title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the incident"
              required
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Severity</label>
            <div className="flex space-x-2">
              {(['Low', 'Medium', 'High'] as SeverityLevel[]).map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={severity === level ? "default" : "outline"}
                  onClick={() => setSeverity(level)}
                  className={getSeverityButtonClass(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default IncidentForm;
