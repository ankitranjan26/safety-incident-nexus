
import React, { useState, useMemo } from 'react';
import { mockIncidents } from '../data/mockIncidents';
import { Incident, SeverityLevel } from '../types/incident';
import IncidentCard from './IncidentCard';
import IncidentForm from './IncidentForm';
import ThreeScene from './ThreeScene';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, SortAscending, SortDescending } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
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
    // First apply filter
    let result = incidents;
    if (severityFilter !== 'All') {
      result = result.filter(incident => incident.severity === severityFilter);
    }
    
    // Then apply sort
    return result.sort((a, b) => {
      const dateA = new Date(a.reportedDate).getTime();
      const dateB = new Date(b.reportedDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, severityFilter, sortOrder]);
  
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI Safety Incident Dashboard
        </h1>
        <p className="text-lg text-foreground/80">
          Monitor and report potential AI system safety violations and incidents
        </p>
      </div>
      
      <div className="mb-8">
        <ThreeScene />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Filter size={18} className="mr-2 text-primary" />
                  <span className="text-sm font-medium mr-2">Filter:</span>
                  <div className="flex space-x-2">
                    {(['All', 'Low', 'Medium', 'High'] as const).map((level) => (
                      <Button
                        key={level}
                        variant={severityFilter === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSeverityFilter(level)}
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
                  className="flex items-center"
                >
                  {sortOrder === 'newest' ? (
                    <>
                      <SortDescending size={16} className="mr-2" />
                      Newest First
                    </>
                  ) : (
                    <>
                      <SortAscending size={16} className="mr-2" />
                      Oldest First
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-4">
                {filteredAndSortedIncidents.length > 0 ? (
                  filteredAndSortedIncidents.map(incident => (
                    <IncidentCard key={incident.id} incident={incident} />
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
        
        <div>
          <IncidentForm onAddIncident={handleAddIncident} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
