import { useState } from 'react';
import { ArrowLeft, Code, Play, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function RewardFunctionStudio() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rewardFunction, setRewardFunction] = useState(
    `def reward_function(params):
    '''
    Example reward function for AWS DeepRacer
    '''
    # Read input parameters
    track_width = params['track_width']
    distance_from_center = params['distance_from_center']
    all_wheels_on_track = params['all_wheels_on_track']
    speed = params['speed']
    
    # Calculate reward based on center line
    marker_1 = 0.1 * track_width
    marker_2 = 0.25 * track_width
    marker_3 = 0.5 * track_width
    
    if distance_from_center <= marker_1:
        reward = 1.0
    elif distance_from_center <= marker_2:
        reward = 0.5
    elif distance_from_center <= marker_3:
        reward = 0.1
    else:
        reward = 1e-3
    
    # Penalize if car goes off track
    if not all_wheels_on_track:
        reward = 1e-3
    
    # Bonus for higher speed
    reward += speed * 0.1
    
    return float(reward)`
  );

  const [testResults, setTestResults] = useState<string>('');

  const handleTest = () => {
    toast({
      title: 'Testing Reward Function',
      description: 'Running simulation with your reward function...',
    });
    
    // Simulate test results
    setTimeout(() => {
      const mockResults = `Test Results:
✓ Syntax validation: PASSED
✓ Parameter validation: PASSED
✓ Test scenario 1 (center line): reward = 1.25
✓ Test scenario 2 (off-center): reward = 0.42
✓ Test scenario 3 (off-track): reward = 0.001

Average reward: 0.557
Estimated performance: Good`;
      
      setTestResults(mockResults);
      toast({
        title: 'Test Complete',
        description: 'Your reward function has been tested successfully.',
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: 'Saved',
      description: 'Reward function saved successfully!',
    });
  };

  const handleReset = () => {
    setRewardFunction(
      `def reward_function(params):
    # Add your reward logic here
    return 1.0`
    );
    setTestResults('');
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
                <Code className="w-8 h-8 text-purple-500" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">Reward Function Studio</h1>
                  <p className="text-xs text-muted-foreground">Create and test custom reward functions</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleTest} className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Test Function
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Reward Function Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={rewardFunction}
                onChange={(e) => setRewardFunction(e.target.value)}
                className="font-mono text-sm min-h-[600px] bg-background"
                placeholder="Enter your reward function..."
              />
            </CardContent>
          </Card>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Test Results */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <pre className="font-mono text-sm bg-background p-4 rounded-lg whitespace-pre-wrap">
                    {testResults}
                  </pre>
                ) : (
                  <p className="text-muted-foreground text-sm">Click "Test Function" to see results</p>
                )}
              </CardContent>
            </Card>

            {/* Available Parameters */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Available Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">all_wheels_on_track</span>
                    <span className="text-muted-foreground">Boolean</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">x, y</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">distance_from_center</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">is_left_of_center</span>
                    <span className="text-muted-foreground">Boolean</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">heading</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">progress</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">steps</span>
                    <span className="text-muted-foreground">Integer</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">speed</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-mono text-purple-400">steering_angle</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-mono text-purple-400">track_width</span>
                    <span className="text-muted-foreground">Float</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
