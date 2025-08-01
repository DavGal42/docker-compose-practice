import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const mainConfig = () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV,
});
