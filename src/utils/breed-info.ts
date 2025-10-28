export interface BreedDetails {
  name: string;
  category: 'Cattle' | 'Buffalo';
  region: string;
  traits: string[];
  funFact: string;
}

export const BREED_INFO: Record<string, BreedDetails> = {
  "Gir": {
    name: "Gir",
    category: "Cattle",
    region: "Gujarat",
    traits: ["Distinctive forehead bulge", "High milk yield", "Heat resistant"],
    funFact: "Known as the 'Pride of Gujarat' and famous worldwide!"
  },
  "Sahiwal": {
    name: "Sahiwal",
    category: "Cattle",
    region: "Punjab",
    traits: ["Reddish-brown color", "Excellent milk production", "Tick resistant"],
    funFact: "One of the best dairy breeds in tropical conditions!"
  },
  "Red Sindhi": {
    name: "Red Sindhi",
    category: "Cattle",
    region: "Sindh",
    traits: ["Red coat", "Good milk yield", "Hardy breed"],
    funFact: "Thrives in hot climates with minimal water!"
  },
  "Tharparkar": {
    name: "Tharparkar",
    category: "Cattle",
    region: "Rajasthan",
    traits: ["White/grey color", "Dual purpose", "Drought resistant"],
    funFact: "Survives in the harshest desert conditions of Thar!"
  },
  "Rathi": {
    name: "Rathi",
    category: "Cattle",
    region: "Rajasthan",
    traits: ["Black/white patches", "Good milker", "Adaptable"],
    funFact: "Perfect for arid regions with scarce resources!"
  },
  "Kankrej": {
    name: "Kankrej",
    category: "Cattle",
    region: "Gujarat/Rajasthan",
    traits: ["Silver-grey color", "Strong draught power", "Long horns"],
    funFact: "Known for incredible strength and endurance!"
  },
  "Hariana": {
    name: "Hariana",
    category: "Cattle",
    region: "Haryana",
    traits: ["Light grey", "Dual purpose", "Powerful build"],
    funFact: "Excellent for both milk and agricultural work!"
  },
  "Ongole": {
    name: "Ongole",
    category: "Cattle",
    region: "Andhra Pradesh",
    traits: ["White color", "Large body", "Heat tolerant"],
    funFact: "Exported globally for crossbreeding programs!"
  },
  "Krishna Valley": {
    name: "Krishna Valley",
    category: "Cattle",
    region: "Karnataka",
    traits: ["Grey color", "Powerful draft", "Disease resistant"],
    funFact: "Known for working in flooded paddy fields!"
  },
  "Kangayam": {
    name: "Kangayam",
    category: "Cattle",
    region: "Tamil Nadu",
    traits: ["Red color", "Strong build", "Excellent draft"],
    funFact: "Famous for traditional bullock cart races!"
  },
  "Murrah": {
    name: "Murrah",
    category: "Buffalo",
    region: "Haryana",
    traits: ["Jet black", "Highest milk yield", "Coiled horns"],
    funFact: "World's best dairy buffalo breed!"
  },
  "Jaffarabadi": {
    name: "Jaffarabadi",
    category: "Buffalo",
    region: "Gujarat",
    traits: ["Large body", "Heavy milk producer", "Drooping horns"],
    funFact: "One of the heaviest buffalo breeds in the world!"
  },
  "Mehsana": {
    name: "Mehsana",
    category: "Buffalo",
    region: "Gujarat",
    traits: ["Medium size", "Good milker", "Black/brown"],
    funFact: "Developed through crossbreeding for optimal milk!"
  },
  "Surti": {
    name: "Surti",
    category: "Buffalo",
    region: "Gujarat",
    traits: ["Small size", "Rich milk", "Sickle-shaped horns"],
    funFact: "Milk is perfect for making traditional sweets!"
  },
  "Bhadawari": {
    name: "Bhadawari",
    category: "Buffalo",
    region: "Uttar Pradesh",
    traits: ["Copper color", "High fat milk", "Compact"],
    funFact: "Known for producing the richest buffalo milk!"
  },
  "Nagpuri": {
    name: "Nagpuri",
    category: "Buffalo",
    region: "Maharashtra",
    traits: ["Black color", "Medium yield", "Strong"],
    funFact: "Ideal for small farms with limited resources!"
  },
  "Toda": {
    name: "Toda",
    category: "Buffalo",
    region: "Tamil Nadu",
    traits: ["Small size", "Hardy", "Hill adapted"],
    funFact: "Raised by the Toda tribe in Nilgiri hills!"
  },
  "Punganur": {
    name: "Punganur",
    category: "Cattle",
    region: "Andhra Pradesh",
    traits: ["World's shortest cattle", "Compact", "Hardy"],
    funFact: "One of the world's smallest cattle breeds!"
  },
  "Vechur": {
    name: "Vechur",
    category: "Cattle",
    region: "Kerala",
    traits: ["Tiny size", "Low maintenance", "Good milk quality"],
    funFact: "Listed in Guinness World Records for smallest size!"
  },
  "Hallikar": {
    name: "Hallikar",
    category: "Cattle",
    region: "Karnataka",
    traits: ["Grey color", "Powerful", "Aggressive temperament"],
    funFact: "Famous in traditional Kambala buffalo races!"
  }
};
