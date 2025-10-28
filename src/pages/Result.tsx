import { useLocation, useNavigate } from 'react-router-dom';
import { Prediction } from '@/utils/onnx-inference';
import { PredictionCard } from '@/components/PredictionCard';
import { BreedInfoDrawer } from '@/components/BreedInfoDrawer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface LocationState {
  predictions: Prediction[];
  imageUrl: string;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!state?.predictions) {
    navigate('/home');
    return null;
  }

  const { predictions, imageUrl } = state;

  const handleBreedInfo = (breedName: string) => {
    setSelectedBreed(breedName);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Breed Analysis</h1>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        {/* Image Preview */}
        <div className="mb-8">
          <img
            src={imageUrl}
            alt="Analyzed cattle"
            className="w-full max-h-96 object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Top Prediction Highlight */}
        <div className="mb-6 p-6 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg border-2 border-accent/30">
          <h2 className="text-sm font-semibold text-muted-foreground mb-1">
            Top Prediction
          </h2>
          <h3 className="text-3xl font-bold text-accent-foreground">
            {predictions[0].breed}
          </h3>
          <p className="text-lg text-muted-foreground mt-1">
            {predictions[0].confidence.toFixed(1)}% confidence
          </p>
        </div>

        {/* All Predictions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">All Predictions</h3>
          {predictions.map((pred, idx) => (
            <PredictionCard
              key={idx}
              prediction={pred}
              rank={idx + 1}
              onInfoClick={() => handleBreedInfo(pred.breed)}
            />
          ))}
        </div>
      </div>

      {/* Breed Info Drawer */}
      <BreedInfoDrawer
        breedName={selectedBreed}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
