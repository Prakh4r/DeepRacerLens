import { Activity, TrendingUp, Zap, Clock, ChevronDown, Map, Code, Trophy, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import F1Car from 'components/F1Car';

export default function App() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Car animation: travels from left (-200px) to right edge (window.innerWidth + 100)
  // Completes journey in ~800px of scroll
  const totalDistance = window.innerWidth + 300; // -200 to window.innerWidth + 100
  const scrollDistance = 800; // pixels of scroll to complete the journey
  const carPosition = Math.min(-200 + (scrollY / scrollDistance) * totalDistance, window.innerWidth + 100);

  const features = [
    {
      title: 'Analytics Dashboard',
      description: 'Real-time performance metrics and interactive visualizations',
      icon: Activity,
      color: 'text-blue-500',
      path: '/dashboard',
    },
    {
      title: 'Training History',
      description: 'View and compare past training sessions over time',
      icon: Clock,
      color: 'text-purple-500',
      path: '/training-history',
    },
    {
      title: 'Model Comparison',
      description: 'Detailed side-by-side model performance analysis',
      icon: TrendingUp,
      color: 'text-green-500',
      path: '/model-comparison',
    },
    {
      title: 'Track Analysis',
      description: 'Performance breakdown by different track types',
      icon: Map,
      color: 'text-teal-500',
      path: '/track-analysis',
    },
    {
      title: 'Reward Function Studio',
      description: 'Create and test custom reward functions',
      icon: Code,
      color: 'text-purple-400',
      path: '/reward-function-studio',
    },
    {
      title: 'Leaderboard',
      description: 'Compare your models with global rankings',
      icon: Trophy,
      color: 'text-yellow-500',
      path: '/leaderboard',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-foreground tracking-tight">DeepRacer Lens</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate('/settings')} variant="outline" size="sm">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="bg-orange-600 hover:bg-orange-700">
                    Navigate
                    <ChevronDown className="w-4 h-4 ml-2" />
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
                  <DropdownMenuItem onClick={() => navigate('/track-analysis')}>
                    <Map className="w-4 h-4 mr-2 text-green-500" />
                    Track Analysis
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reward-function-studio')}>
                    <Code className="w-4 h-4 mr-2 text-purple-500" />
                    Reward Function Studio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/leaderboard')}>
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    Leaderboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <SettingsIcon className="w-4 h-4 mr-2 text-blue-500" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
        {/* Animated F1 Car */}
        <div
          ref={carRef}
          className="absolute top-1/2 -translate-y-1/2 transition-transform duration-100 ease-linear z-0"
          style={{ 
            left: `${carPosition}px`,
            opacity: carPosition > window.innerWidth ? 0 : 0.4
          }}
        >
          <F1Car className="w-64 h-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-6xl font-bold text-foreground tracking-tight">
            AWS DeepRacer
            <span className="block text-5xl mt-2 bg-gradient-to-r from-orange-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
              Performance Analytics
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Optimize your autonomous racing models with real-time insights, detailed analytics, and powerful tools
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
            >
              <Activity className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/settings')}
              className="text-lg px-8"
            >
              <SettingsIcon className="w-5 h-5 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to optimize your DeepRacer models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.path}
                className="border-border bg-card hover:bg-card/80 transition-all cursor-pointer group hover:border-orange-500/50"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button variant="ghost" className="mt-4 w-full group-hover:bg-orange-500/10">
                    Explore →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-16">
        <Card className="border-border bg-gradient-to-br from-orange-500/10 via-blue-500/10 to-green-500/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Optimize Your Models?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Configure your AWS credentials in Settings and start analyzing your DeepRacer performance data
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/settings')}
              className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
            >
              <SettingsIcon className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
