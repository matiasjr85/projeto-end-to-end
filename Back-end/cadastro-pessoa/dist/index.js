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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const Pessoa_1 = __importDefault(require("./models/Pessoa"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.options('*', (0, cors_1.default)());
app.post("/api/cadastro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, idade } = req.body;
    console.log(req.body);
    try {
        const novaPessoa = new Pessoa_1.default({ nome, idade });
        yield novaPessoa.save();
        res.status(201).json({ message: "Cadastro realizado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar pessoa:", error);
        res.status(500).json({ message: "Erro ao cadastrar pessoa." });
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});