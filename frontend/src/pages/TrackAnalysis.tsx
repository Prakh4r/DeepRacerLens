import { useState } from 'react';
import { ArrowLeft, Map, TrendingUp, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function TrackAnalysis() {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState('reinvent-2018');

  // Mock data for track performance
  const trackPerformanceData = [
    { track: 're:Invent 2018', avgTime: 12.5, bestTime: 10.2, completionRate: 92 },
    { track: 'Tokyo Training', avgTime: 15.3, bestTime: 13.1, completionRate: 85 },
    { track: 'London Loop', avgTime: 18.7, bestTime: 16.4, completionRate: 78 },
    { track: 'Oval Track', avgTime: 9.8, bestTime: 8.5, completionRate: 95 },
    { track: 'Bowtie Track', avgTime: 14.2, bestTime: 12.8, completionRate: 88 },
  ];

  // Track characteristics radar data
  const trackCharacteristics = [
    { characteristic: 'Turns', value: 85 },
    { characteristic: 'Straightaways', value: 45 },
    { characteristic: 'Difficulty', value: 70 },
    { characteristic: 'Length', value: 60 },
    { characteristic: 'Width', value: 55 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Map className="w-8 h-8 text-green-500" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">Track Analysis</h1>
                  <p className="text-xs text-muted-foreground">Performance breakdown by track type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Track Selector */}
        <div className="mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Select Track:</label>
                <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reinvent-2018">re:Invent 2018 Track</SelectItem>
                    <SelectItem value="tokyo">Tokyo Training Track</SelectItem>
                    <SelectItem value="london">London Loop</SelectItem>
                    <SelectItem value="oval">Oval Track</SelectItem>
                    <SelectItem value="bowtie">Bowtie Track</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Lap Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-500">10.2s</span>
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Lap Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">12.5s</span>
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-500">92%</span>
                <Award className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">248</span>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Track Performance Comparison */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Track Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={trackPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="track" stroke="#888" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="avgTime" fill="#3b82f6" name="Avg Time (s)" />
                  <Bar dataKey="bestTime" fill="#10b981" name="Best Time (s)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Track Characteristics */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Track Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={trackCharacteristics}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="characteristic" stroke="#888" />
                  <PolarRadiusAxis stroke="#888" />
                  <Radar name="Characteristics" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Completion Rate by Track */}
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Completion Rate by Track</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trackPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="track" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="completionRate" fill="#8b5cf6" name="Completion Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
