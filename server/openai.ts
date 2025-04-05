import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface LifespanPrediction {
  remainingLifespan: string;
  analysis: string;
}

export async function predictLifespan(imageData: string, classification: any): Promise<LifespanPrediction> {
  try {
    // Remove the "data:image/jpeg;base64," part if present
    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "");
    
    const prompt = `
      Analyze this electronic device image and provide:
      1. Remaining lifespan estimate (in years/months)
      2. Detailed analysis of its condition and reasons for the lifespan prediction
      
      Device information:
      - Type: ${classification.deviceType}
      - Category: ${classification.deviceCategory}
      - Observed condition: ${classification.condition}
      
      Response format:
      {
        "remainingLifespan": "X-Y years/months",
        "analysis": "Detailed explanation of condition assessment and lifespan prediction..."
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert in electronic devices who can analyze images to predict remaining lifespan."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    // Ensure content is a string before parsing
    const content = response.choices[0].message.content as string;
    const result = JSON.parse(content);
    
    return {
      remainingLifespan: result.remainingLifespan || 'Unknown',
      analysis: result.analysis || 'Unable to analyze the device properly.'
    };
  } catch (error) {
    console.error("Error in lifespan prediction:", error);
    
    // Return a fallback in case of error
    return {
      remainingLifespan: "Unknown",
      analysis: "Unable to analyze the device properly. Please try again with a clearer image."
    };
  }
}
