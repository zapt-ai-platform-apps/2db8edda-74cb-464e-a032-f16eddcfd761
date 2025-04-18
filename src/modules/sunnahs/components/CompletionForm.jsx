import React, { useState } from 'react';
import { api } from '../api';
import { eventBus } from '@/modules/core/events';
import { events } from '@/modules/core/events';
import * as Sentry from '@sentry/browser';

export default function CompletionForm({ sunnah, onSuccess, onCancel }) {
  const [notes, setNotes] = useState('');
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.completeSunnah(sunnah.id, notes, shared);
      
      // Publish completion event
      eventBus.publish(events.SUNNAH_COMPLETED, {
        sunnahId: sunnah.id,
        notes,
        shared
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error completing Sunnah:', error);
      setError('حدث خطأ أثناء تسجيل إكمال السنة. يرجى المحاولة مرة أخرى.');
      Sentry.captureException(error, {
        extra: { 
          component: 'CompletionForm', 
          action: 'completeSunnah',
          sunnahId: sunnah.id,
          hasNotes: !!notes,
          shared
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-secondary-200 mt-6">
      <h3 className="text-lg font-bold mb-4">سجل تطبيقك لسنة: {sunnah.title}</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="notes" className="block text-secondary-700 mb-2">
            ملاحظات حول تطبيقك (اختياري)
          </label>
          <textarea
            id="notes"
            className="textarea"
            placeholder="أدخل ملاحظاتك حول تطبيق هذه السنة..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={shared}
              onChange={(e) => setShared(e.target.checked)}
            />
            <span className="mr-2 text-secondary-700">
              مشاركة تجربتي مع الآخرين
            </span>
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 space-x-reverse">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            إلغاء
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'جارِ التسجيل...' : 'تسجيل التطبيق'}
          </button>
        </div>
      </form>
    </div>
  );
}