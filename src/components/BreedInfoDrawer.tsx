import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BREED_INFO } from '@/utils/breed-info';
import { Badge } from './ui/badge';

interface BreedInfoDrawerProps {
  breedName: string | null;
  open: boolean;
  onClose: () => void;
}

export function BreedInfoDrawer({ breedName, open, onClose }: BreedInfoDrawerProps) {
  if (!breedName) return null;

  const info = BREED_INFO[breedName];
  if (!info) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{info.name}</SheetTitle>
          <SheetDescription>
            <Badge variant="secondary" className="mt-2">
              {info.category}
            </Badge>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Region</h4>
            <p className="text-base">{info.region}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Key Traits</h4>
            <ul className="space-y-2">
              {info.traits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Fun Fact</span>
            </h4>
            <p className="text-sm">{info.funFact}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
