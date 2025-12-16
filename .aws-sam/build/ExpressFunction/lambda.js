import serverless from 'serverless-http';
import app from './app.js';

// Wrap the Express app for Lambda
export const handler = serverless(app);
