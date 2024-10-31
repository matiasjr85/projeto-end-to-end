"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const pessoaRoutes_1 = __importDefault(require("./routes/pessoaRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.options('*', (0, cors_1.default)());
// Usando as rotas definidas
app.use('/api', pessoaRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
