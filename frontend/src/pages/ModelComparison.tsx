import { useState } from 'react';
import { TrendingUp, Activity, Zap, ChevronDown, Trophy, Clock } from 'lucide-react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const modelComparisonData = [
  { metric: 'Lap Time', 'model-v1': 35, 'model-v2': 65, 'model-v3': 95 },
  { metric: 'Completion', 'model-v1': 68, 'model-v2': 87, 'model-v3': 95 },
  { metric: 'Reward', 'model-v1': 58, 'model-v2': 77, 'model-v3': 100 },
  { metric: 'Speed', 'model-v1': 45, 'model-v2': 70, 'model-v3': 85 },
];

const radarData = [
  { category: 'Speed', 'model-v1': 45, 'model-v2': 70, 'model-v3': 85 },
  { category: 'Precision', 'model-v1': 60, 'model-v2': 75, 'model-v3': 88 },
  { category: 'Consistency', 'model-v1': 55, 'model-v2': 80, 'model-v3': 92 },
  { category: 'Reward', 'model-v1': 58, 'model-v2': 77, 'model-v3': 100 },
  { category: 'Completion', 'model-v1': 68, 'model-v2': 87, 'model-v3': 95 },
];

const modelStats = [
  { id: 'model-v1', name: 'Model v1', lapTime: 22.8, completion: 68.5, reward: 145.2, training: 3.8 },
  { id: 'model-v2', name: 'Model v2', lapTime: 18.2, completion: 87.3, reward: 192.5, training: 4.2 },
  { id: 'model-v3', name: 'Model v3', lapTime: 15.6, completion: 94.8, reward: 248.7, training: 5.1 },
];

export default function ModelComparison() {
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState(['model-v2', 'model-v3']);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Model Comparison</h1>
                <p className="text-xs text-muted-foreground">Side-by-side performance analysis</p>
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
        {/* Model Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelStats.map((model) => (
            <Card key={model.id} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  {model.name}
                  {model.id === 'model-v3' && <Trophy className="w-5 h-5 text-yellow-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Best Lap</span>
                  <span className="font-mono text-sm font-bold text-foreground">{model.lapTime}s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Completion</span>
                  <span className="font-mono text-sm font-bold text-foreground">{model.completion}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Reward</span>
                  <span className="font-mono text-sm font-bold text-foreground">{model.reward}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Training</span>
                  <span className="font-mono text-sm font-bold text-foreground">{model.training}h</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Radar Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide">Multi-Dimensional Performance</CardTitle>
            <p className="text-xs text-muted-foreground">Radar comparison across key metrics</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                <Radar name="Model v1" dataKey="model-v1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                <Radar name="Model v2" dataKey="model-v2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                <Radar name="Model v3" dataKey="model-v3" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart Comparison */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide">Performance Metrics Comparison</CardTitle>
            <p className="text-xs text-muted-foreground">Normalized scores (0-100)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={modelComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="model-v1" fill="hsl(var(--chart-1))" name="Model v1" />
                <Bar dataKey="model-v2" fill="hsl(var(--chart-2))" name="Model v2" />
                <Bar dataKey="model-v3" fill="hsl(var(--chart-3))" name="Model v3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="border-border bg-gradient-to-br from-green-500/10 to-blue-500/10">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide">Comparison Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 p-3 bg-background border border-green-500/20">
              <div className="w-1 bg-green-500 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">Model v3 Leads All Categories</div>
                <div className="text-xs text-muted-foreground">Achieves 35% faster lap times and 38% higher completion rate compared to v1.</div>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-background border border-blue-500/20">
              <div className="w-1 bg-blue-500 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">Progressive Improvement</div>
                <div className="text-xs text-muted-foreground">Clear performance gains across model iterations show effective hyperparameter tuning.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
