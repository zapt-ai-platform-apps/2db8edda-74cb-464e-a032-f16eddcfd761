import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { completions, sunnahs } from '../drizzle/schema.js';
import { eq, desc, and } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received request for shared completions');
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get only shared completions
    const result = await db.select({
      completion: completions,
      sunnah: sunnahs,
    })
    .from(completions)
    .innerJoin(sunnahs, eq(completions.sunnahId, sunnahs.id))
    .where(eq(completions.shared, true))
    .orderBy(desc(completions.completedAt))
    .limit(20);

    // Transform the data into a more usable format without user IDs
    const formattedResults = result.map(item => ({
      id: item.completion.id,
      sunnahId: item.completion.sunnahId,
      notes: item.completion.notes,
      completedAt: item.completion.completedAt,
      sunnah: {
        id: item.sunnah.id,
        title: item.sunnah.title,
        content: item.sunnah.content,
        type: item.sunnah.type,
      }
    }));
    
    console.log(`Found ${formattedResults.length} shared completions`);
    
    return res.status(200).json({ 
      completions: formattedResults 
    });
    
  } catch (error) {
    console.error('Error getting shared completions:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/sharedCompletions',
        method: 'GET'
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to get shared completions',
      message: error.message 
    });
  }
}