import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';
import * as Sentry from '@sentry/browser';
import { eventBus } from '@/modules/core/events';
import { events } from '../events';
import Loading from '@/shared/components/Loading';
import SunnahCard from './SunnahCard';
import CompletionForm from './CompletionForm';

export default function DailySunnah() {
  const [sunnah, setSunnah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchDailySunnah() {
      try {
        setLoading(true);
        const sunnahData = await api.getDailySunnah();
        setSunnah(sunnahData);
        eventBus.publish(events.SUNNAH_LOADED, { sunnah: sunnahData });
      } catch (error) {
        console.error('Error fetching daily Sunnah:', error);
        setError('حدث خطأ أثناء جلب السنة اليومية. يرجى المحاولة مرة أخرى.');
        Sentry.captureException(error, {
          extra: { component: 'DailySunnah', action: 'fetchDailySunnah' }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDailySunnah();
  }, []);

  const handleComplete = () => {
    if (user) {
      setShowCompletionForm(true);
    } else {
      // Alert user that they need to sign in
      alert('يرجى تسجيل الدخول لتسجيل إكمال السنة');
    }
  };
  
  const handleCompletionSuccess = () => {
    setShowCompletionForm(false);
  };

  if (loading) {
    return <Loading message="جاري تحميل السنة اليومية..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 btn-secondary"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!sunnah) {
    return (
      <div className="text-center p-4">
        <p className="text-secondary-600">لا توجد سنة متاحة اليوم. يرجى المحاولة لاحقًا.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">سنة اليوم</h2>
      
      <SunnahCard sunnah={sunnah} />
      
      {!showCompletionForm ? (
        <div className="mt-6 text-center">
          <button 
            onClick={handleComplete} 
            className="btn-primary"
          >
            سجل تطبيقي لهذه السنة
          </button>
        </div>
      ) : (
        <CompletionForm 
          sunnah={sunnah} 
          onSuccess={handleCompletionSuccess}
          onCancel={() => setShowCompletionForm(false)}
        />
      )}
    </div>
  );
}