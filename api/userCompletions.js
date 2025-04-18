import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { completions, sunnahs } from '../drizzle/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received request for user completions');
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    console.log('Authenticated user:', user.id);
    
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Perform a join to get completion data with sunnah details
    const result = await db.select({
      completion: completions,
      sunnah: sunnahs,
    })
    .from(completions)
    .innerJoin(sunnahs, eq(completions.sunnahId, sunnahs.id))
    .where(eq(completions.userId, user.id))
    .orderBy(desc(completions.completedAt));

    // Transform the data into a more usable format
    const formattedResults = result.map(item => ({
      id: item.completion.id,
      sunnahId: item.completion.sunnahId,
      notes: item.completion.notes,
      shared: item.completion.shared,
      completedAt: item.completion.completedAt,
      sunnah: {
        id: item.sunnah.id,
        title: item.sunnah.title,
        content: item.sunnah.content,
        type: item.sunnah.type,
      }
    }));
    
    console.log(`Found ${formattedResults.length} completions for user`);
    
    return res.status(200).json({ 
      completions: formattedResults 
    });
    
  } catch (error) {
    console.error('Error getting user completions:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/userCompletions',
        method: 'GET'
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to get user completions',
      message: error.message 
    });
  }
}