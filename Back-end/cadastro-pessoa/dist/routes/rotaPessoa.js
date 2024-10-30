"use strict";
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
const express_1 = require("express");
const Pessoa_1 = __importDefault(require("../models/Pessoa"));
const router = (0, express_1.Router)();
router.post('/pessoa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, idade } = req.body;
        const novaPessoa = new Pessoa_1.default({ nome, idade });
        yield novaPessoa.save();
        res.status(201).json(novaPessoa);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
    }
}));
exports.default = router;
