import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.FLOW_TETYOU_DB_HOST,
  user: process.env.FLOW_TETYOU_DB_USER,
  password: process.env.FLOW_TETYOU_DB_PASSWORD,
  database: process.env.FLOW_TETYOU_DB_DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;