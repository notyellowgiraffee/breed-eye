import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface ImagePickerProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export function ImagePicker({ onImageSelect, disabled }: ImagePickerProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <Button
        variant="hero"
        size="lg"
        onClick={() => cameraInputRef.current?.click()}
        disabled={disabled}
        className="flex-1"
      >
        <Camera className="mr-2 h-5 w-5" />
        Capture Photo
      </Button>
      
      <Button
        variant="predict"
        size="lg"
        onClick={() => galleryInputRef.current?.click()}
        disabled={disabled}
        className="flex-1"
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload Image
      </Button>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
