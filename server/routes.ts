import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { classifyImage } from "./image-classification";
import { predictLifespan } from "./openai";
import { insertDeviceAnalysisSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // API routes
  // Get all analyses for the current user
  app.get("/api/analysis", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const analyses = await storage.getDeviceAnalysisByUser(req.user.id);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching analyses" });
    }
  });

  // Get a specific analysis
  app.get("/api/analysis/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const analysis = await storage.getDeviceAnalysis(parseInt(req.params.id));
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      if (analysis.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Error fetching analysis" });
    }
  });

  // Process image and create a new analysis
  app.post("/api/classify", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { imageData } = req.body;
      
      if (!imageData) {
        return res.status(400).json({ message: "No image data provided" });
      }

      // Classify the image using TensorFlow.js
      const classification = await classifyImage(imageData);
      
      // Predict lifespan using OpenAI
      const lifespanPrediction = await predictLifespan(imageData, classification);
      
      // Combine the results
      const analysisResult = {
        userId: req.user.id,
        deviceType: classification.deviceType,
        deviceCategory: classification.deviceCategory,
        condition: classification.condition,
        confidence: classification.confidence,
        components: classification.components,
        recyclable: classification.recyclable,
        remainingLifespan: lifespanPrediction.remainingLifespan,
        lifespanAnalysis: lifespanPrediction.analysis,
        imageUrl: '' // We're not storing the actual image, just the analysis
      };
      
      // Validate the data
      const validationResult = insertDeviceAnalysisSchema.safeParse(analysisResult);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid analysis data",
          errors: validationResult.error.errors
        });
      }
      
      // Store the analysis
      const savedAnalysis = await storage.createDeviceAnalysis(analysisResult);
      
      res.status(201).json(savedAnalysis);
    } catch (error) {
      console.error("Error in /api/classify:", error);
      res.status(500).json({ 
        message: "Error processing image",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
