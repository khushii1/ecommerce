import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(morgan('combined'));
app.use('/uploads', express.static('uploads'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use('/api/v1', apiRoutes);
app.get('/health', (_req, res) => res.status(200).json({ success: true, message: 'healthy' }));
app.use(notFound);
app.use(errorHandler);

export default app;
