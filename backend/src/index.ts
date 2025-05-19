import express from 'express';
import pool from './db';
import { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env.development');

dotenv.config({ path: envPath });

const app = express();
app.use(express.json()); // JSONをパースする

const PORT = 4000;
const DUMMY_USER_ID_STRING = process.env.DUMMY_USER_ID_DEV;

// 投稿をDBに記録する
app.post("/api/note", async (req: Request, res: Response): Promise<void>  => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "文章は必須です"});
    return
  }

  try {
    const sql = "INSERT INTO notes (user_id, text) VALUES (?, ?)";
    const [result] = await pool.query(sql, [DUMMY_USER_ID_STRING, text]);
    res.status(201).json({ message: "追加成功"});
  } catch (err) {
    console.error("DBエラー", err);
    res.status(500).json({ error: "サーバエラー"});
  }
});

// 投稿内容を取得する
app.get('/api/notes', async (req: Request, res: Response): Promise<void> => {
  try {
    const sql = "select * from notes;";
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("DBエラー", err);
    res.status(500).json({ error: "サーバエラー"});
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});