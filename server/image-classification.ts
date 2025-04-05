interface ClassificationResult {
  deviceType: string;
  deviceCategory: string;
  condition: string;
  confidence: number;
  components: string;
  recyclable: string;
}

// Common electronic device categories and types
const deviceCategories = [
  { 
    category: "Smartphone", 
    types: ["iPhone", "Samsung Galaxy", "Google Pixel", "Xiaomi", "Huawei", "OnePlus", "Generic Smartphone"],
    components: "Battery, Display, PCB, Camera, Speakers, Microphone"
  },
  { 
    category: "Laptop", 
    types: ["MacBook", "Dell XPS", "HP Spectre", "Lenovo ThinkPad", "Asus ZenBook", "Generic Laptop"],
    components: "Battery, Display, PCB, Keyboard, Trackpad, Speakers, Hard Drive, RAM, CPU"
  },
  { 
    category: "Desktop", 
    types: ["Mac Mini", "Dell Optiplex", "HP Pavilion", "Custom PC", "Generic Desktop"],
    components: "Motherboard, CPU, RAM, Power Supply, Hard Drive, Graphics Card, Cooling System"
  },
  { 
    category: "Tablet", 
    types: ["iPad", "Samsung Tab", "Microsoft Surface", "Amazon Fire", "Generic Tablet"],
    components: "Battery, Display, PCB, Touch Controller, Camera"
  },
  { 
    category: "TV/Monitor", 
    types: ["Samsung TV", "LG TV", "Sony TV", "Dell Monitor", "Generic Display"],
    components: "LCD/LED Panel, Power Board, Main Board, Speakers"
  },
  { 
    category: "Camera", 
    types: ["Canon DSLR", "Nikon", "Sony Alpha", "GoPro", "Generic Camera"],
    components: "Sensor, Lens, Battery, PCB, Display"
  },
  { 
    category: "Wearable", 
    types: ["Apple Watch", "Fitbit", "Samsung Galaxy Watch", "Generic Smartwatch"],
    components: "Battery, Display, Sensors, PCB"
  },
  { 
    category: "Audio Device", 
    types: ["Headphones", "Speakers", "Earbuds", "Soundbar", "Generic Audio Device"],
    components: "Drivers, Battery (if wireless), PCB, Enclosure"
  }
];

// Note: This is a basic implementation that simulates image classification
// In a real-world application, this would use TensorFlow.js to actually analyze the image
export async function classifyImage(imageData: string): Promise<ClassificationResult> {
  // Simulate a delay for processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration purposes, randomly select a device category and type
  const randomCategoryIndex = Math.floor(Math.random() * deviceCategories.length);
  const category = deviceCategories[randomCategoryIndex];
  
  const randomTypeIndex = Math.floor(Math.random() * category.types.length);
  const deviceType = category.types[randomTypeIndex];
  
  // Random condition (Good, Fair, Poor)
  const conditions = ["Good", "Fair", "Poor"];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Random confidence level (60-98%)
  const confidence = Math.floor(Math.random() * 38) + 60;
  
  // Set recyclable percentage based on device category (70-90%)
  const recyclablePercentage = Math.floor(Math.random() * 20) + 70;
  
  return {
    deviceType,
    deviceCategory: category.category,
    condition,
    confidence,
    components: category.components,
    recyclable: `${recyclablePercentage}% Recyclable`,
  };
}
