import { supabase } from '@/supabaseClient';

export const api = {
  async getDailySunnah() {
    const response = await fetch('/api/dailySunnah');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch daily Sunnah');
    }
    
    const data = await response.json();
    return data.sunnah;
  },
  
  async completeSunnah(sunnahId, notes, shared) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to complete a Sunnah');
    }
    
    const response = await fetch('/api/completeSunnah', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        sunnahId,
        notes,
        shared
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to complete Sunnah');
    }
    
    const data = await response.json();
    return data;
  },
  
  async getUserCompletions() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to get completions');
    }
    
    const response = await fetch('/api/userCompletions', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get user completions');
    }
    
    const data = await response.json();
    return data.completions;
  },
  
  async getSharedCompletions() {
    const response = await fetch('/api/sharedCompletions');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get shared completions');
    }
    
    const data = await response.json();
    return data.completions;
  }
};