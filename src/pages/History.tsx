import { useNavigate } from 'react-router-dom';
import { getHistory, clearHistory } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function History() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState(getHistory());

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All prediction history has been removed",
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <h1 className="text-2xl font-bold">Prediction History</h1>
          {history.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClear}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No predictions yet</p>
            <Button variant="hero" onClick={() => navigate('/home')}>
              Start Identifying
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <Card
                key={entry.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  navigate('/result', {
                    state: {
                      predictions: entry.predictions,
                      imageUrl: entry.imageUrl,
                    },
                  })
                }
              >
                <div className="flex gap-4">
                  <img
                    src={entry.imageUrl}
                    alt={entry.topBreed}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{entry.topBreed}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.predictions[0].confidence.toFixed(1)}% confidence
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
