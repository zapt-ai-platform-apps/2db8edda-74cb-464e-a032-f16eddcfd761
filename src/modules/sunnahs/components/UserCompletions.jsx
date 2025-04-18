import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';
import * as Sentry from '@sentry/browser';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import Loading from '@/shared/components/Loading';

export default function UserCompletions() {
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchUserCompletions() {
      if (!user) return;
      
      try {
        setLoading(true);
        const completionsData = await api.getUserCompletions();
        setCompletions(completionsData);
      } catch (error) {
        console.error('Error fetching user completions:', error);
        setError('حدث خطأ أثناء جلب سجل التطبيق. يرجى المحاولة مرة أخرى.');
        Sentry.captureException(error, {
          extra: { component: 'UserCompletions', action: 'fetchUserCompletions' }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserCompletions();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-secondary-600">يرجى تسجيل الدخول لعرض سجل التطبيق.</p>
      </div>
    );
  }

  if (loading) {
    return <Loading message="جاري تحميل سجل التطبيق..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (completions.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm">
        <p className="text-secondary-600">لم تقم بتسجيل أي تطبيق للسنن بعد.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">سجل تطبيقي للسنن</h2>
      
      <div className="space-y-4">
        {completions.map(completion => (
          <div key={completion.id} className="card">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-primary-700">
                {completion.sunnah.title}
              </h3>
              <span className="text-xs text-secondary-500">
                {format(new Date(completion.completedAt), 'dd MMMM yyyy', { locale: ar })}
              </span>
            </div>
            
            <p className="mb-2">{completion.sunnah.content}</p>
            
            {completion.notes && (
              <div className="bg-secondary-50 p-3 rounded-md mt-3">
                <h4 className="font-bold text-secondary-800 mb-1">ملاحظاتي:</h4>
                <p className="text-secondary-700">{completion.notes}</p>
              </div>
            )}
            
            {completion.shared && (
              <div className="mt-2 text-xs text-secondary-500 flex items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">تمت المشاركة</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}