import * as ort from 'onnxruntime-web';

// Indian cattle and buffalo breeds (ordered by model output)
export const BREEDS = [
  'Alambadi', 'Amritmahal', 'Ayrshire', 'Banni', 'Bargur', 'Bhadawari', 'Brown_Swiss',
  'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana', 'Holstein_Friesian',
  'Jaffrabadi', 'Jersey', 'Kangayam', 'Kankrej', 'Kasargod', 'Kenkatha', 'Kherigarh',
  'Khillari', 'Krishna_Valley', 'Malnad_gidda', 'Mehsana', 'Murrah', 'Nagori',
  'Nagpuri', 'Nili_Ravi', 'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane',
  'Red_Sindhi', 'Sahiwal', 'Surti', 'Tharparkar', 'Toda', 'Umblachery', 'Vechur'
];

export interface Prediction {
  breed: string;
  confidence: number;
  category: 'Cattle' | 'Buffalo';
}

let session: ort.InferenceSession | null = null;

export async function loadModel(modelPath: string): Promise<void> {
  try {
    session = await ort.InferenceSession.create(modelPath);
    console.log('✅ Model loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load model:', error);
    throw new Error('Failed to load ONNX model. Please ensure the model file is placed correctly.');
  }
}

async function preprocessImage(imageElement: HTMLImageElement): Promise<ort.Tensor> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Resize to 384x384 with high-quality (bicubic-like) interpolation
  canvas.width = 384;
  canvas.height = 384;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(imageElement, 0, 0, 384, 384);
  
  const imageData = ctx.getImageData(0, 0, 384, 384);
  const { data } = imageData;
  
  // ImageNet normalization values
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  
  // Convert to CHW format and normalize
  const float32Data = new Float32Array(3 * 384 * 384);
  
  for (let i = 0; i < 384 * 384; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    
    float32Data[i] = (r - mean[0]) / std[0];
    float32Data[384 * 384 + i] = (g - mean[1]) / std[1];
    float32Data[2 * 384 * 384 + i] = (b - mean[2]) / std[2];
  }
  
  return new ort.Tensor('float32', float32Data, [1, 3, 384, 384]);
}

export async function predictBreed(imageFile: File): Promise<Prediction[]> {
  if (!session) {
    throw new Error('Model not loaded. Please upload the model file first.');
  }
  
  // Load image
  const img = new Image();
  const imageUrl = URL.createObjectURL(imageFile);
  
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageUrl;
  });
  
  try {
    // Preprocess
    const inputTensor = await preprocessImage(img);
    
    // Run inference
    const results = await session.run({ input: inputTensor });
    const output = results.output.data as Float32Array;
    
    // Get top-5 predictions
    const predictions: { index: number; score: number }[] = [];
    for (let i = 0; i < output.length; i++) {
      predictions.push({ index: i, score: output[i] });
    }
    
    predictions.sort((a, b) => b.score - a.score);
    const top5 = predictions.slice(0, 5);
    
    // Softmax for confidence percentages
    const expScores = top5.map(p => Math.exp(p.score));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    
    // Buffalo breeds: Bhadawari, Jaffrabadi, Mehsana, Murrah, Nili_Ravi, Nagpuri, Surti, Toda
    const buffaloBreeds = ['Bhadawari', 'Jaffrabadi', 'Mehsana', 'Murrah', 'Nili_Ravi', 'Nagpuri', 'Surti', 'Toda'];
    
    return top5.map((p, idx) => ({
      breed: BREEDS[p.index] || `Breed ${p.index}`,
      confidence: (expScores[idx] / sumExp) * 100,
      category: buffaloBreeds.includes(BREEDS[p.index]) ? 'Buffalo' : 'Cattle'
    }));
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export function isModelLoaded(): boolean {
  return session !== null;
}
