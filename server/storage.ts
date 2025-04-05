import { users, type User, type InsertUser, deviceAnalysis, type DeviceAnalysis, type InsertDeviceAnalysis } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Device analysis operations
  getDeviceAnalysisByUser(userId: number): Promise<DeviceAnalysis[]>;
  getDeviceAnalysis(id: number): Promise<DeviceAnalysis | undefined>;
  createDeviceAnalysis(analysis: InsertDeviceAnalysis): Promise<DeviceAnalysis>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private deviceAnalyses: Map<number, DeviceAnalysis>;
  currentUserId: number;
  currentDeviceAnalysisId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.deviceAnalyses = new Map();
    this.currentUserId = 1;
    this.currentDeviceAnalysisId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDeviceAnalysisByUser(userId: number): Promise<DeviceAnalysis[]> {
    return Array.from(this.deviceAnalyses.values()).filter(
      (analysis) => analysis.userId === userId,
    ).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getDeviceAnalysis(id: number): Promise<DeviceAnalysis | undefined> {
    return this.deviceAnalyses.get(id);
  }

  async createDeviceAnalysis(insertAnalysis: InsertDeviceAnalysis): Promise<DeviceAnalysis> {
    const id = this.currentDeviceAnalysisId++;
    const now = new Date();
    const analysis: DeviceAnalysis = { 
      ...insertAnalysis, 
      id, 
      createdAt: now
    };
    this.deviceAnalyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
