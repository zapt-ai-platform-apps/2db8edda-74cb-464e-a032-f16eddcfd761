import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';

export default function AuthUI() {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">تسجيل الدخول مع ZAPT</h2>
        <p className="text-secondary-600 mb-4">
          سجل الدخول لحفظ تقدمك في تطبيق السنن اليومية
        </p>
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-800 transition-colors"
        >
          زيارة موقع ZAPT
        </a>
      </div>

      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#0369a1',
                brandAccent: '#0284c7',
              },
            },
          },
          className: {
            container: 'auth-container',
            button: 'auth-button',
            input: 'input',
            label: 'auth-label',
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'البريد الإلكتروني',
              password_label: 'كلمة المرور',
              button_label: 'تسجيل الدخول',
              link_text: 'لديك حساب بالفعل؟ تسجيل الدخول',
              magic_link: {
                button_label: 'إرسال رابط تسجيل الدخول',
                loading_button_label: 'جارِ إرسال الرابط...'
              }
            },
            sign_up: {
              email_label: 'البريد الإلكتروني',
              password_label: 'كلمة المرور',
              button_label: 'إنشاء حساب',
              link_text: 'ليس لديك حساب؟ إنشاء حساب',
            },
            forgotten_password: {
              email_label: 'البريد الإلكتروني',
              password_label: 'كلمة المرور',
              button_label: 'إرسال رابط إعادة تعيين كلمة المرور',
              link_text: 'نسيت كلمة المرور؟',
            },
          },
        }}
      />
    </div>
  );
}