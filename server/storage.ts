import { randomUUID } from "crypto";

// Theme builder doesn't need user storage currently
// Keeping a minimal storage interface for future expansion

export interface IStorage {
  // Add theme storage methods here if needed in the future
  healthCheck(): Promise<boolean>;
}

export class MemStorage implements IStorage {
  constructor() {
    // Basic storage setup
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

export const storage = new MemStorage();
