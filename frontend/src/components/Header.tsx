import type { User } from '../types/user';
import { getUserInfo } from '../services/getAuthInfo';
import { useState, useEffect } from 'react';


// バックエンドAPIのベースURL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: User = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
        setUser(null); // エラー時は null にする
      }
    };
    
    fetchUser();
  }, []);

  if (!user) return null;

  const handleLoout = () => {
    // express-openid-connect のログインフローを開始
    // バックエンドのログイン開始URLにリダイレクト
    window.location.href = `${API_BASE_URL}/logout`;
  };

  return (
    <div className='app-header'>
      <div className='header-left'>
        <a href="/" className='logo'>FlowTetyou</a>
      </div>
      <div className='header-right'>
        <div className='header-element user-email'>{ user.email }</div>
        <div className='header-element user-name'>{ user.name }</div>
        <button className='header-element logout-button' onClick={handleLoout}>ログアウト</button>
      </div>
    </div>
  )
};

export default Header;