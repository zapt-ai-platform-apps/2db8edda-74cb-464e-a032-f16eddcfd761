import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { completions } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received request to complete Sunnah');
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    console.log('Authenticated user:', user.id);
    
    // Get request body
    const { sunnahId, notes, shared } = req.body;
    
    if (!sunnahId) {
      return res.status(400).json({ error: 'Missing required field: sunnahId' });
    }
    
    console.log('Completing Sunnah:', { sunnahId, notes, shared });
    
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Insert completion record
    const result = await db.insert(completions).values({
      userId: user.id,
      sunnahId: parseInt(sunnahId),
      notes: notes || null,
      shared: shared || false,
    }).returning();
    
    console.log('Completion recorded successfully:', result[0]?.id);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Sunnah completed successfully',
      completion: result[0]
    });
    
  } catch (error) {
    console.error('Error completing Sunnah:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/completeSunnah',
        method: 'POST',
        body: req.body
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to complete Sunnah',
      message: error.message 
    });
  }
}