import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connString;

if (process.env.NODE_ENV === 'development') {
  connString = process.env.DEV_DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connString = process.env.TEST_DATABASE_URL;
} else {
  connString = process.env.PROD_DATABASE_URL;
}

const pool = new Pool({
  connectionString: connString,
});

export default pool;
