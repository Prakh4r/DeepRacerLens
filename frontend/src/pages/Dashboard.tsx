import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Trophy, Clock, RefreshCw, Download, Zap, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import brain from 'brain';
import { PerformanceData } from 'types';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('model-v2');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await brain.get_performance_data({ modelId: selectedModel });
      const performanceData = await response.json();
      setData(performanceData);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedModel]);

  const handleRefresh = () => {
    fetchData();
  };

  const handleExport = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `deepracer-${selectedModel}-data.json`;
      link.click();
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mx-auto" />
          <p className="text-muted-foreground font-mono">Loading performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Performance Analytics</h1>
                <p className="text-xs text-muted-foreground">Model optimization and training insights</p>
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
                </DropdownMenuContent>
              </DropdownMenu>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-background border border-border text-foreground text-sm px-3 py-2 rounded-md font-mono"
              >
                <option value="model-v1">Model v1 (Beginner)</option>
                <option value="model-v2">Model v2 (Intermediate)</option>
                <option value="model-v3">Model v3 (Advanced)</option>
              </select>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Best Lap Time</span>
                <Trophy className="w-4 h-4 text-chart-1" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{data.metrics.best_lap_time}s</div>
              <div className="text-xs text-chart-1 mt-1">Peak performance</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Avg Completion</span>
                <Activity className="w-4 h-4 text-chart-2" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{data.metrics.avg_completion}%</div>
              <div className="text-xs text-chart-2 mt-1">Track completion rate</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Reward</span>
                <TrendingUp className="w-4 h-4 text-chart-3" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{data.metrics.total_reward}</div>
              <div className="text-xs text-chart-3 mt-1">Episode 50 peak</div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Training Time</span>
                <Clock className="w-4 h-4 text-chart-4" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{data.metrics.training_time}h</div>
              <div className="text-xs text-muted-foreground mt-1">50 episodes</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Progress */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide">Training Progress</CardTitle>
              <p className="text-xs text-muted-foreground">Reward and completion over episodes</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.training_progress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="episode" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="reward" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="completion" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Lap Times */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide">Lap Time Performance</CardTitle>
              <p className="text-xs text-muted-foreground">Recent lap times (seconds)</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.lap_times}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="lap" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                  <Bar dataKey="time" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Speed Metrics */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide">Speed by Track Segment</CardTitle>
              <p className="text-xs text-muted-foreground">Average speed (m/s)</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.speed_metrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <YAxis type="category" dataKey="segment" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px', fontFamily: 'monospace' }} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                  <Bar dataKey="speed" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Reward Breakdown */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide">Reward Function Breakdown</CardTitle>
              <p className="text-xs text-muted-foreground">Contribution by category</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={data.reward_breakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, value }) => `${category}: ${value}`}
                    outerRadius={90}
                    fill="hsl(var(--chart-1))"
                    dataKey="value"
                  >
                    {data.reward_breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide">AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedModel === 'model-v1' && (
              <>
                <div className="flex gap-3 p-3 bg-background border border-orange-500/20">
                  <div className="w-1 bg-orange-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Beginner Model Performance</div>
                    <div className="text-xs text-muted-foreground">This model shows steady improvement. Consider increasing training episodes to 75 for better lap times.</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-background border border-blue-500/20">
                  <div className="w-1 bg-blue-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Speed Optimization Needed</div>
                    <div className="text-xs text-muted-foreground">Low speed on straights suggests conservative speed parameters. Try increasing max speed threshold.</div>
                  </div>
                </div>
              </>
            )}
            {selectedModel === 'model-v2' && (
              <>
                <div className="flex gap-3 p-3 bg-background border border-green-500/20">
                  <div className="w-1 bg-green-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Balanced Performance</div>
                    <div className="text-xs text-muted-foreground">Excellent balance between speed and completion rate. This model is production-ready.</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-background border border-blue-500/20">
                  <div className="w-1 bg-blue-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Consistent Improvement</div>
                    <div className="text-xs text-muted-foreground">Reward curve shows healthy growth without plateauing. Well-tuned hyperparameters.</div>
                  </div>
                </div>
              </>
            )}
            {selectedModel === 'model-v3' && (
              <>
                <div className="flex gap-3 p-3 bg-background border border-purple-500/20">
                  <div className="w-1 bg-purple-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Advanced Performance Achieved</div>
                    <div className="text-xs text-muted-foreground">Exceptional lap times and completion rate. This model demonstrates optimal racing strategy.</div>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-background border border-green-500/20">
                  <div className="w-1 bg-green-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">High-Speed Mastery</div>
                    <div className="text-xs text-muted-foreground">Superior speed management across all track segments. Ready for competitive racing.</div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
