import { Prediction } from './onnx-inference';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  imageUrl: string;
  predictions: Prediction[];
  topBreed: string;
}

const HISTORY_KEY = 'moonet_history';
const MAX_HISTORY = 10;

export function saveToHistory(imageFile: File, predictions: Prediction[]): void {
  const history = getHistory();
  
  const reader = new FileReader();
  reader.onload = () => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageUrl: reader.result as string,
      predictions,
      topBreed: predictions[0].breed
    };
    
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  };
  reader.readAsDataURL(imageFile);
}

export function getHistory(): HistoryEntry[] {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function getTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('moonet_theme');
  return (stored as 'light' | 'dark') || 'dark';
}

export function setTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem('moonet_theme', theme);
}
