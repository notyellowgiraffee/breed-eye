import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Prediction } from '@/utils/onnx-inference';
import { Info } from 'lucide-react';
import { Button } from './ui/button';

interface PredictionCardProps {
  prediction: Prediction;
  rank: number;
  onInfoClick: () => void;
}

export function PredictionCard({ prediction, rank, onInfoClick }: PredictionCardProps) {
  const getBadgeColor = () => {
    if (rank === 1) return 'bg-accent text-accent-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor()}`}>
            #{rank}
          </span>
          <div>
            <h3 className="font-semibold text-lg">{prediction.breed}</h3>
            <p className="text-sm text-muted-foreground">{prediction.category}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onInfoClick}>
          <Info className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-semibold">{prediction.confidence.toFixed(1)}%</span>
        </div>
        <Progress value={prediction.confidence} className="h-2" />
      </div>
    </Card>
  );
}
