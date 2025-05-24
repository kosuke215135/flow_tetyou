import express from 'express';
import pool from './db';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';
import { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';
import { auth, requiresAuth } from "express-openid-connect"
import { UserinfoResponse } from 'openid-client';
import cors from 'cors';

dotenv.config();
const envPath = path.resolve(__dirname, '../.env.development');
dotenv.config({ path: envPath });


const app = express();
app.use(express.json()); // JSONをパースする

const PORT = 4000;

// CROSの設定
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}))

// 認証の設定
app.use(
  auth({
    authRequired: false,
    secret: process.env.RANDOM_STRING,
    issuerBaseURL: process.env.GOOGLE_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET, 
    authorizationParams: {
        response_type: 'code',
        scope: 'openid profile email', 
    },
    routes: {
      callback: '/callback',
      postLogoutRedirect: 'http://localhost:5173/home',
    },
    session: {
      cookie: {
          secure: false, // HTTP環境でのみ false に設定
        }
    },
  })
);

app.get('/', async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    console.log(req.oidc.user);
    const result:boolean = await alreadyRegistered(req.oidc.user as UserinfoResponse);
    if (!result) { // ユーザー登録されていない場合
      await userRegistration(req.oidc.user as UserinfoResponse);
    }
    res.redirect('http://localhost:5173/home');
  } else {
    res.redirect('/login'); 
  }
});

const alreadyRegistered = async (user: UserinfoResponse) => {
  const sql = "SELECT 1 FROM users WHERE id=? LIMIT 1"; // idに一致するものを見つけて1を返す。
  const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql, [user.sub]);

  return result.length > 0; // 1のときはすでに登録されている
};

const userRegistration = async (user: UserinfoResponse) => {
  const sql = "INSERT INTO users (id, email, name) VALUES (?, ?, ?)"; 
  const userId = process.env.GOOGLE_PREFIX + user.sub; // 将来的に他サービスの認証も追加することを予想して、サービスごとの接頭辞をつけておく
  await pool.query(sql, [userId, user.email, user.name]); 
};

// 現在の認証状態を返すAPI (フロントエンドで利用)
app.get('/api/me', (req: Request, res: Response) => {
  console.log('--- /api/me Route ---');
  if (req.oidc.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.oidc.user });
  } else {
    console.log('Session in /api/me:', (req as any).session);
    res.status(401).json({ isAuthenticated: false, message: "Not authenticated in /api/me" });
  }
});

app.get('/api/user/profile', requiresAuth(), async (req: Request, res: Response) => {
  if (!req.oidc.user) {// requiresAuth()があるので、通常undefindではないがvscodeで指摘されるので
    res.status(500).json({ message: 'Internal Server Error: User information missing despite authentication.' });
    return;
  }
  const userId = process.env.GOOGLE_PREFIX + req.oidc.user.sub;
  const sql = "select * from users where id=?"; 
  const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql, [userId]);
  res.json(result[0]);
});


// 投稿をDBに記録する
app.post("/api/note", requiresAuth(), async (req: Request, res: Response): Promise<void>  => {
  const { userId, text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "文章は必須です"});
    return
  }

  try {
    const sql = "INSERT INTO notes (user_id, text) VALUES (?, ?)";
    await pool.query(sql, [userId, text]);
    res.status(201).json({ message: "追加成功"});
  } catch (err) {
    console.error("DBエラー", err);
    res.status(500).json({ error: "サーバエラー"});
  }
});

// 投稿内容を取得する
app.get('/api/notes', requiresAuth(), async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId;
    const sql = "select * from notes where user_id=?";
    const [rows] = await pool.query(sql, [userId]);
    res.json(rows);
  } catch (err) {
    console.error("DBエラー", err);
    res.status(500).json({ error: "サーバエラー"});
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});