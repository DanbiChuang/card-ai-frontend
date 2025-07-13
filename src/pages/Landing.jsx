import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../context.jsx';
import Button from '../components/UI/Button.jsx';

export default function Landing() {
  const navigate = useNavigate();
  const { accessToken } = React.useContext(AppCtx);

  const handleLogin = () => {
    // 如果已經登入，直接跳轉到上傳頁面
    if (accessToken) {
      navigate('/upload');
    } else {
      // 重定向到 Google OAuth
      const u = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      u.searchParams.set('response_type', 'token');
      u.searchParams.set('client_id', import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID');
      u.searchParams.set('redirect_uri', import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/oauth2callback`);
      u.searchParams.set('scope', 'https://www.googleapis.com/auth/gmail.send');
      window.location.href = u.toString();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 黑色漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
      
      {/* 內容層 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-6 fade-in">
          <h1 className="text-6xl font-bold mb-6 tracking-wide">
            Shot2<span className="italic">M<span style={{ color: '#117CFF' }}>ai</span>l</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-md mx-auto">
            Snap a Card. Seal the Deal.
          </p>
          <Button
            onClick={handleLogin}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            {accessToken ? '開始使用' : '登入即開始'}
          </Button>
        </div>
      </div>
    </div>
  );
} 