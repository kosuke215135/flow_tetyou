import type { User } from '../types/user';
import axios from 'axios';

// userの情報を得る関数
export const getUserInfo = async (): Promise<User> => {
  const res = await axios.get<User>("/api/user/profile"); 
  return res.data
};