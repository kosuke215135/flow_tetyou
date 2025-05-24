export interface User {
  name?: string;
  nickname?: string;
  email?: string;
  sub?: string; // OpenID Connect の Subject ID
  picture?: string;
  // IDプロバイダから返される可能性のあるその他のプロパティ
  [key: string]: any; // より柔軟にするため
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// バックエンドの /api/me からのレスポンス型
export interface AuthStatusResponse {
  isAuthenticated: boolean;
  user?: User;
}