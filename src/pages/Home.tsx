import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePicker } from '@/components/ImagePicker';
import { ModelUploader } from '@/components/ModelUploader';
import { ThemeToggle } from '@/components/ThemeToggle';
import { loadModel, isModelLoaded, predictBreed } from '@/utils/onnx-inference';
import { saveToHistory } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';
import { History, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [modelLoaded, setModelLoaded] = useState(isModelLoaded());
  const [isProcessing, setIsProcessing] = useState(false);
  const [cowClickCount, setCowClickCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-load model on mount
  useState(() => {
    const autoLoadModel = async () => {
      setIsProcessing(true);
      try {
        await loadModel('/moonet_final.onnx');
        setModelLoaded(true);
      } catch (error) {
        console.error('Failed to auto-load model:', error);
      } finally {
        setIsProcessing(false);
      }
    };
    
    if (!isModelLoaded()) {
      autoLoadModel();
    }
  });

  const handleModelUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const modelUrl = URL.createObjectURL(file);
      await loadModel(modelUrl);
      setModelLoaded(true);
      toast({
        title: "Model Loaded! 🎉",
        description: "You can now start identifying breeds",
      });
    } catch (error) {
      toast({
        title: "Error Loading Model",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const predictions = await predictBreed(file);
      saveToHistory(file, predictions);
      
      // Navigate to results page with state
      navigate('/result', { 
        state: { 
          predictions, 
          imageUrl: URL.createObjectURL(file) 
        } 
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCowClick = () => {
    const newCount = cowClickCount + 1;
    setCowClickCount(newCount);
    
    if (newCount === 5) {
      toast({
        title: "🐄 Moo! Doja Cat ppspsppssps 🐮💫",
        description: "You found the easter egg!",
      });
      setCowClickCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span 
            className="text-3xl cursor-pointer select-none" 
            onClick={handleCowClick}
            role="img"
            aria-label="cow"
          >
            🐄
          </span>
          <h1 className="text-2xl font-bold">MooNet</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/history')} title="View History">
            <History className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/about')} title="About MooNet">
            <Info className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {!modelLoaded ? (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Welcome to MooNet</h2>
              <p className="text-lg text-muted-foreground">
                AI-Powered Cattle & Buffalo Breed Identification
              </p>
            </div>
            <ModelUploader onModelUpload={handleModelUpload} isLoading={isProcessing} />
          </div>
        ) : (
          <div className="w-full max-w-2xl text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Identify Your Cattle Breed 🐄
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Capture or upload an image to identify Indian cattle and buffalo breeds with AI
              </p>
            </div>

            <ImagePicker 
              onImageSelect={handleImageSelect} 
              disabled={isProcessing}
            />

            {isProcessing && (
              <div className="mt-8">
                <div className="animate-pulse text-muted-foreground">
                  Analyzing image...
                </div>
              </div>
            )}

            <div className="mt-12 p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How it works</h3>
              <ol className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>1. Capture or upload a clear image of the animal</li>
                <li>2. Our AI model analyzes the breed characteristics</li>
                <li>3. Get top-5 predictions with confidence scores</li>
                <li>4. Learn more about each breed</li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
