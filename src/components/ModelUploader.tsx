import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useRef } from 'react';

interface ModelUploaderProps {
  onModelUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export function ModelUploader({ onModelUpload, isLoading }: ModelUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.name.endsWith('.onnx') || file.name.endsWith('.pt'))) {
      await onModelUpload(file);
    }
  };

  return (
    <Card className="p-8 text-center max-w-md mx-auto">
      <div className="mb-4">
        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Upload ONNX Model</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Upload your <code className="bg-muted px-1 py-0.5 rounded">moonet_final_scripted.onnx</code> model file to get started.
      </p>
      <Button
        variant="predict"
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? 'Loading Model...' : 'Choose Model File'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".onnx"
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-xs text-muted-foreground mt-4">
        Only .onnx files are supported
      </p>
    </Card>
  );
}
