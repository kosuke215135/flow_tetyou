import express from 'express';
import pool from './db';
import { Request, Response } from "express";

const app = express();
app.use(express.json()); // JSONをパースする

const PORT = 4000;

// 投稿をDBに記録する
app.post("/api/note", async (req: Request, res: Response): Promise<void>  => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "文章は必須です"});
    return
  }

  try {
    const sql = "INSERT INTO notes (text) VALUES (?)";
    const [result] = await pool.query(sql, [text]);
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