"use strict";
// src/routes/pessoaRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pessoaController_1 = require("../controller/pessoaController");
const router = (0, express_1.Router)();
// Definindo as rotas
router.post('/cadastro', pessoaController_1.criarPessoa);
router.get('/pessoas', pessoaController_1.obterPessoas);
router.patch('/pessoas/:id', pessoaController_1.atualizarPessoaParcial);
router.put('/pessoas/:id', pessoaController_1.atualizarPessoaCompleta);
router.delete('/pessoas/:id', pessoaController_1.deletarPessoa);
exports.default = router;
