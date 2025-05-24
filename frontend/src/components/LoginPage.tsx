// src/components/LoginPage.tsx
import React from 'react';

// バックエンドAPIのベースURL
const API_BASE_URL: string = "http://localhost:4000";

interface LoginPageProps {
  // express-openid-connect を使う場合、このコンポーネントから直接認証状態を
  // 更新する必要は通常ありません。リダイレクトとApp.tsxのuseEffectで処理されます。
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const handleLogin = () => {
    // express-openid-connect のログインフローを開始
    // バックエンドのログイン開始URLにリダイレクト
    window.location.href = `${API_BASE_URL}/login`;
  };

  return (
    <div>
      <h2>ログインページ</h2>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginPage;