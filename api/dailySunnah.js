import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sunnahs, dailySunnahs } from '../drizzle/schema.js';
import { eq, desc, and } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received request for daily Sunnah');
  
  try {
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get today's date (UTC)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log('Checking for today\'s Sunnah:', today.toISOString());
    
    // Check if we already have a Sunnah for today
    const existingDaily = await db.select()
      .from(dailySunnahs)
      .where(and(
        eq(dailySunnahs.date, today)
      ))
      .limit(1);

    let sunnahData;
    
    if (existingDaily.length > 0) {
      console.log('Found existing daily Sunnah with ID:', existingDaily[0].sunnahId);
      
      // Get the Sunnah details
      const result = await db.select()
        .from(sunnahs)
        .where(eq(sunnahs.id, existingDaily[0].sunnahId))
        .limit(1);
        
      if (result.length > 0) {
        sunnahData = result[0];
      }
    } else {
      // Get the count of Sunnahs
      const countResult = await db.select().from(sunnahs);
      const sunnahCount = countResult.length;
      
      if (sunnahCount === 0) {
        return res.status(404).json({ error: 'No Sunnahs found in database' });
      }
      
      // Get a random Sunnah ID
      const randomIndex = Math.floor(Math.random() * sunnahCount);
      const randomSunnah = countResult[randomIndex];
      
      if (!randomSunnah) {
        return res.status(404).json({ error: 'Failed to get random Sunnah' });
      }
      
      console.log('Selected random Sunnah with ID:', randomSunnah.id);
      
      // Insert the daily Sunnah record
      await db.insert(dailySunnahs).values({
        sunnahId: randomSunnah.id,
        date: today,
      });
      
      sunnahData = randomSunnah;
    }
    
    if (!sunnahData) {
      return res.status(404).json({ error: 'Sunnah not found' });
    }
    
    console.log('Returning Sunnah data:', sunnahData.title);
    
    // Return the Sunnah
    return res.status(200).json({ sunnah: sunnahData });
    
  } catch (error) {
    console.error('Error getting daily Sunnah:', error);
    Sentry.captureException(error, {
      extra: {
        route: '/api/dailySunnah',
        method: 'GET'
      }
    });
    return res.status(500).json({ error: 'Failed to get daily Sunnah' });
  }
}