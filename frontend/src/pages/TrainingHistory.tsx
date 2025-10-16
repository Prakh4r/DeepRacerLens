import { useState } from 'react';
import { Clock, TrendingUp, Calendar, Activity, Zap, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const trainingSessionsData = [
  { date: '2025-01-15', model: 'model-v1', bestLap: 22.8, avgReward: 145, episodes: 50, duration: 3.8 },
  { date: '2025-01-18', model: 'model-v2', bestLap: 18.2, avgReward: 192, episodes: 50, duration: 4.2 },
  { date: '2025-01-22', model: 'model-v2', bestLap: 17.5, avgReward: 205, episodes: 75, duration: 6.1 },
  { date: '2025-01-25', model: 'model-v3', bestLap: 15.6, avgReward: 248, episodes: 50, duration: 5.1 },
  { date: '2025-01-28', model: 'model-v3', bestLap: 14.8, avgReward: 265, episodes: 75, duration: 7.3 },
];

const progressOverTime = [
  { session: 1, lapTime: 22.8, reward: 145 },
  { session: 2, lapTime: 18.2, reward: 192 },
  { session: 3, lapTime: 17.5, reward: 205 },
  { session: 4, lapTime: 15.6, reward: 248 },
  { session: 5, lapTime: 14.8, reward: 265 },
];

export default function TrainingHistory() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Training History</h1>
                <p className="text-xs text-muted-foreground">View and compare past training sessions</p>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Navigate
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <Zap className="w-4 h-4 mr-2 text-orange-500" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Activity className="w-4 h-4 mr-2 text-blue-500" />
                    Analytics Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/training-history')}>
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    Training History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/model-comparison')}>
                    <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                    Model Comparison
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Progress Over Time Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide">Performance Improvement Over Time</CardTitle>
            <p className="text-xs text-muted-foreground">Lap time and reward progression across training sessions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={progressOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="session" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} label={{ value: 'Session', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} label={{ value: 'Lap Time (s)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} label={{ value: 'Reward', angle: 90, position: 'insideRight' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line yAxisId="left" type="monotone" dataKey="lapTime" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={{ r: 5 }} name="Lap Time (s)" />
                <Line yAxisId="right" type="monotone" dataKey="reward" stroke="hsl(var(--chart-3))" strokeWidth={3} dot={{ r: 5 }} name="Reward" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Training Sessions Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Training Sessions
            </CardTitle>
            <p className="text-xs text-muted-foreground">Complete history of all training runs</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Model</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Best Lap</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Avg Reward</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Episodes</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingSessionsData.map((session, idx) => (
                    <tr 
                      key={idx} 
                      className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedSession(idx)}
                    >
                      <td className="py-3 px-4 font-mono text-foreground">{session.date}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-orange-500/10 text-orange-500 rounded text-xs font-mono">
                          {session.model}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-foreground">{session.bestLap}s</td>
                      <td className="py-3 px-4 text-right font-mono text-foreground">{session.avgReward}</td>
                      <td className="py-3 px-4 text-right font-mono text-foreground">{session.episodes}</td>
                      <td className="py-3 px-4 text-right font-mono text-foreground">{session.duration}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Session Details */}
        {selectedSession !== null && (
          <Card className="border-border bg-gradient-to-br from-orange-500/10 to-purple-500/10">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide">Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="font-mono text-foreground">{trainingSessionsData[selectedSession].date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Model</p>
                  <p className="font-mono text-foreground">{trainingSessionsData[selectedSession].model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Best Lap Time</p>
                  <p className="font-mono text-foreground">{trainingSessionsData[selectedSession].bestLap}s</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Avg Reward</p>
                  <p className="font-mono text-foreground">{trainingSessionsData[selectedSession].avgReward}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
