import { MongoClient, Db } from 'mongodb';

class DatabaseService {
  private static instance: DatabaseService;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private mongoUri: string;

  private constructor() {
    this.mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch';
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    try {
      if (!this.client) {
        this.client = new MongoClient(this.mongoUri);
      }
      
      await this.client.connect();
      this.db = this.client.db();
      
      console.log('✅ Connected to MongoDB');
      return this.db;
      
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('✅ Disconnected from MongoDB');
    }
  }

  public getDatabase(): Db | null {
    return this.db;
  }
}

export default DatabaseService;
