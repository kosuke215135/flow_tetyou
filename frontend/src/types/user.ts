export interface User {
  id: string;
  email: string;
  name: string;
  password: string | null;
  created_at: string;
  update_at: string;
}