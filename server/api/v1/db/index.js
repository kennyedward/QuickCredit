import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connString,
});

export default pool;
