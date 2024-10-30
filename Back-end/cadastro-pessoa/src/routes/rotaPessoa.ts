import { Router, Request, Response } from 'express';
import pessoa from '../models/Pessoa';

const router = Router();

router.post('/pessoa', async (req: Request, res: Response) => {
  try {
    const { nome, idade } = req.body;
    const novaPessoa = new pessoa({ nome, idade });
    await novaPessoa.save();
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
  }
});

export default router;
