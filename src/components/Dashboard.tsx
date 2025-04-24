import React, { useState, useMemo } from 'react';
import { mockIncidents } from '../data/mockIncidents';
import { Incident, SeverityLevel } from '../types/incident';
import IncidentCard from './IncidentCard';
import IncidentForm from './IncidentForm';
import ThreeScene from './ThreeScene';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, ArrowDownAZ, ArrowUpAZ, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const { theme, setTheme } = useTheme();
  
  const handleAddIncident = (title: string, description: string, severity: SeverityLevel) => {
    const newIncident: Incident = {
      id: (incidents.length + 1).toString(),
      title,
      description,
      severity,
      reportedDate: new Date().toISOString().split('T')[0]
    };
    
    setIncidents(prev => [...prev, newIncident]);
  };
  
  const filteredAndSortedIncidents = useMemo(() => {
    let result = incidents;
    if (severityFilter !== 'All') {
      result = result.filter(incident => incident.severity === severityFilter);
    }
    
    return result.sort((a, b) => {
      const dateA = new Date(a.reportedDate).getTime();
      const dateB = new Date(b.reportedDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, severityFilter, sortOrder]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5 transition-colors duration-300">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-lg text-foreground/80 animate-fade-in max-w-2xl mx-auto">
            Monitor and report potential AI system safety violations and incidents
          </p>
        </div>
        
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg animate-float">
          <ThreeScene />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2 text-primary animate-pulse-glow" />
                    <span className="text-sm font-medium mr-2">Filter:</span>
                    <div className="flex space-x-2">
                      {(['All', 'Low', 'Medium', 'High'] as const).map((level) => (
                        <Button
                          key={level}
                          variant={severityFilter === level ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSeverityFilter(level)}
                          className={`transition-all duration-200 ${
                            severityFilter === level ? 'shadow-lg scale-105' : ''
                          }`}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center hover:scale-105 transition-transform"
                  >
                    {sortOrder === 'newest' ? (
                      <>
                        <ArrowDownAZ size={16} className="mr-2" />
                        Newest First
                      </>
                    ) : (
                      <>
                        <ArrowUpAZ size={16} className="mr-2" />
                        Oldest First
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {filteredAndSortedIncidents.length > 0 ? (
                    filteredAndSortedIncidents.map((incident, index) => (
                      <div
                        key={incident.id}
                        className="transition-all duration-300"
                        style={{
                          opacity: 0,
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
                        }}
                      >
                        <IncidentCard incident={incident} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-foreground/70">
                      No incidents found matching the current filters
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-in">
            <IncidentForm onAddIncident={handleAddIncident} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
