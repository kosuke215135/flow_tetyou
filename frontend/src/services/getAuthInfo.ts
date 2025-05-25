import type { User } from '../types/user';
import type { AuthStatusResponse } from '../types/auth';
import axios from 'axios';

// 認証したかどうかをバックエンドに問い合わせる
export const isAuthenticated = async () => {
  const res = await axios.get<AuthStatusResponse>("/api/me"); 
  return res.data.isAuthenticated
};

// userの情報を得る関数
export const getUserInfo = async (): Promise<User> => {
  const res = await axios.get<User>("/api/user/profile"); 
  return res.data
};

