import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/database';
import cors from 'cors';
import pessoaRoutes from './routes/pessoaRoutes';

const app = express();
const PORT = 3000;

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.options('*', cors());

app.use('/api', pessoaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
