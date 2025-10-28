import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Github, Award, Target, Users } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🐄</span>
          <h1 className="text-4xl font-bold mb-4">MooNet</h1>
          <p className="text-xl text-muted-foreground">
            AI for Bharat Pashudhan
          </p>
        </div>

        {/* Mission */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <Target className="h-6 w-6 text-accent mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">
                Empowering Field Level Workers (FLWs) across rural India to accurately identify
                cattle and buffalo breeds using AI technology. We're solving the breed
                misidentification problem that affects livestock policy, veterinary care, and
                agricultural research.
              </p>
            </div>
          </div>
        </Card>

        {/* Technology */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <Award className="h-6 w-6 text-accent mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Technology</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• <strong>Model:</strong> MobileNetV4 with custom classification head</li>
                <li>• <strong>Accuracy:</strong> ~96% on Indian cattle & buffalo breeds</li>
                <li>• <strong>Runtime:</strong> ONNX Runtime Web (fully offline)</li>
                <li>• <strong>Breeds:</strong> 20+ major Indian livestock breeds</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Hackathon Info */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-accent mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Hackathon Project</h2>
              <p className="text-muted-foreground mb-3">
                <strong>Theme:</strong> AI in Agriculture<br />
                <strong>Problem Statement:</strong> Image-based breed recognition for cattle and
                buffaloes of India
              </p>
              <p className="text-sm text-muted-foreground italic">
                Built with ❤️ and PyTorch by undergraduate developers for national hackathon
              </p>
            </div>
          </div>
        </Card>

        {/* Impact */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Social Impact</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-1">Data Accuracy</h3>
              <p className="text-muted-foreground">
                Reduces breed misidentification in government livestock apps
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-1">Offline First</h3>
              <p className="text-muted-foreground">
                Works in rural areas without internet connectivity
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-1">Scalable</h3>
              <p className="text-muted-foreground">
                Can expand to other livestock (goats, sheep, etc.)
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-1">Empowerment</h3>
              <p className="text-muted-foreground">
                Helps FLWs make informed veterinary decisions
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
