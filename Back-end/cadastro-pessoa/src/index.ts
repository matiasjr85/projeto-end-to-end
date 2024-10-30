import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import connectDB from './config/database';
import path from "path";
import Pessoa from './models/Pessoa';
import cors from 'cors';

const app = express();
const PORT = 3000;

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}));



app.use(express.json());
app.options('*', cors());

app.post("/api/cadastro", async (req: Request, res: Response) => {
  const { nome, idade } = req.body;
  console.log(req.body);

  try {
    const novaPessoa = new Pessoa({ nome, idade});
    await novaPessoa.save();
    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    res.status(500).json({ message: "Erro ao cadastrar pessoa." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
