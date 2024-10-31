"use strict";
// src/controllers/pessoaController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarPessoa = exports.atualizarPessoaCompleta = exports.atualizarPessoaParcial = exports.obterPessoas = exports.criarPessoa = void 0;
const Pessoa_1 = __importDefault(require("../models/Pessoa"));
// Função para criar uma nova pessoa
const criarPessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, idade } = req.body;
    try {
        const novaPessoa = new Pessoa_1.default({ nome, idade });
        yield novaPessoa.save();
        res.status(201).json({ message: "Cadastro realizado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar pessoa:", error);
        res.status(500).json({ message: "Erro ao cadastrar pessoa." });
    }
});
exports.criarPessoa = criarPessoa;
// Função para obter todas as pessoas
const obterPessoas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pessoas = yield Pessoa_1.default.find();
        res.status(200).json(pessoas);
    }
    catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        res.status(500).json({ message: "Erro ao buscar pessoas." });
    }
});
exports.obterPessoas = obterPessoas;
// Função para atualizar parcialmente uma pessoa
const atualizarPessoaParcial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const atualizacoes = req.body;
    try {
        const pessoaAtualizada = yield Pessoa_1.default.findByIdAndUpdate(id, atualizacoes, { new: true });
        if (pessoaAtualizada) {
            res.status(200).json({ message: "Atualização parcial realizada com sucesso!", pessoa: pessoaAtualizada });
        }
        else {
            res.status(404).json({ message: "Pessoa não encontrada." });
        }
    }
    catch (error) {
        console.error("Erro ao atualizar pessoa:", error);
        res.status(500).json({ message: "Erro ao atualizar pessoa." });
    }
});
exports.atualizarPessoaParcial = atualizarPessoaParcial;
// Função para atualizar completamente uma pessoa
const atualizarPessoaCompleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dadosCompletos = req.body;
    try {
        const pessoaAtualizada = yield Pessoa_1.default.findOneAndReplace({ _id: id }, dadosCompletos, { new: true });
        if (pessoaAtualizada) {
            res.status(200).json({ message: "Atualização completa realizada com sucesso!", pessoa: pessoaAtualizada });
        }
        else {
            res.status(404).json({ message: "Pessoa não encontrada." });
        }
    }
    catch (error) {
        console.error("Erro ao substituir pessoa:", error);
        res.status(500).json({ message: "Erro ao substituir pessoa." });
    }
});
exports.atualizarPessoaCompleta = atualizarPessoaCompleta;
// Função para deletar uma pessoa
const deletarPessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pessoaDeletada = yield Pessoa_1.default.findByIdAndDelete(id);
        if (pessoaDeletada) {
            res.status(200).json({ message: "Pessoa deletada com sucesso!" });
        }
        else {
            res.status(404).json({ message: "Pessoa não encontrada." });
        }
    }
    catch (error) {
        console.error("Erro ao deletar pessoa:", error);
        res.status(500).json({ message: "Erro ao deletar pessoa." });
    }
});
exports.deletarPessoa = deletarPessoa;
