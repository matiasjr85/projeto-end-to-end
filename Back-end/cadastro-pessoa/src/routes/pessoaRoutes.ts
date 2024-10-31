import { Router } from 'express';
import {
  criarPessoa,
  obterPessoas,
  atualizarPessoaParcial,
  atualizarPessoaCompleta,
  deletarPessoa
} from '../controller/pessoaController';

const router = Router();

router.post('/cadastro', criarPessoa);
router.get('/pessoas', obterPessoas);
router.patch('/pessoas/:id', atualizarPessoaParcial);
router.put('/pessoas/:id', atualizarPessoaCompleta);
router.delete('/pessoas/:id', deletarPessoa);

export default router;

