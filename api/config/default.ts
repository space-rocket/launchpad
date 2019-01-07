import { IConfig } from './types';

const defaultConfig: IConfig = {
  frontendUrl: process.env.LOCALHOST_FRONTEND_URL,
  jwtKey: process.env.JWT_KEY,
  mongoUrl: process.env.MONGO_URL || process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  siteTitle: process.env.SITE_TITLE,
};

export default defaultConfig;
