import { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState('all');

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'SpeedDemon_AI', model: 'DeepRacer-Pro-v3', lapTime: 8.234, country: '🇺🇸', points: 9850 },
    { rank: 2, name: 'RacingBot_Elite', model: 'OptimizedRacer-v2', lapTime: 8.456, country: '🇯🇵', points: 9720 },
    { rank: 3, name: 'TurboModel_X', model: 'FastTrack-AI', lapTime: 8.678, country: '🇩🇪', points: 9580 },
    { rank: 4, name: 'AIRacer_Pro', model: 'DeepSpeed-v4', lapTime: 8.891, country: '🇬🇧', points: 9440 },
    { rank: 5, name: 'NeuralDriver', model: 'SmartRacer-v1', lapTime: 9.123, country: '🇨🇦', points: 9300 },
    { rank: 6, name: 'AutoPilot_Max', model: 'RaceOptimizer', lapTime: 9.345, country: '🇫🇷', points: 9160 },
    { rank: 7, name: 'MLRacing_King', model: 'DeepRacer-Ultra', lapTime: 9.567, country: '🇮🇳', points: 9020 },
    { rank: 8, name: 'QuantumRacer', model: 'HyperSpeed-AI', lapTime: 9.789, country: '🇦🇺', points: 8880 },
    { rank: 9, name: 'DeepDrive_Pro', model: 'VelocityBot', lapTime: 10.012, country: '🇸🇬', points: 8740 },
    { rank: 10, name: 'AISpeedster', model: 'RaceMaster-v2', lapTime: 10.234, country: '🇧🇷', points: 8600 },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

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
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">Global Leaderboard</h1>
                  <p className="text-xs text-muted-foreground">Compare your models with global rankings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Best Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-yellow-500">#7</span>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Best Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">9.567s</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-500">9,020</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Global Racers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">15,432</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Track Filter */}
        <div className="mb-6">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Track:</label>
                <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tracks</SelectItem>
                    <SelectItem value="reinvent-2018">re:Invent 2018 Track</SelectItem>
                    <SelectItem value="tokyo">Tokyo Training Track</SelectItem>
                    <SelectItem value="london">London Loop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Racer</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Best Lap</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="text-right">Country</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow key={entry.rank} className={entry.rank === 7 ? 'bg-purple-500/10' : ''}>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {entry.name}
                        {entry.rank === 7 && <Badge variant="secondary">You</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{entry.model}</TableCell>
                    <TableCell className="font-mono font-bold text-green-500">{entry.lapTime}s</TableCell>
                    <TableCell className="font-semibold">{entry.points.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-2xl">{entry.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
