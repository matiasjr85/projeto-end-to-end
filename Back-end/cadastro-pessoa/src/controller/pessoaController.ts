import { Request, Response } from 'express';
import Pessoa from '../models/Pessoa';

export const criarPessoa = async (req: Request, res: Response) => {
  const { nome, idade } = req.body;

  try {
    const novaPessoa = new Pessoa({ nome, idade });
    await novaPessoa.save();
    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    res.status(500).json({ message: "Erro ao cadastrar pessoa." });
  }
};

export const obterPessoas = async (req: Request, res: Response) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    res.status(500).json({ message: "Erro ao buscar pessoas." });
  }
};

export const atualizarPessoaParcial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const atualizacoes = req.body;

  try {
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(id, atualizacoes, { new: true });
    if (pessoaAtualizada) {
      res.status(200).json({ message: "Atualização parcial realizada com sucesso!", pessoa: pessoaAtualizada });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ message: "Erro ao atualizar pessoa." });
  }
};

export const atualizarPessoaCompleta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dadosCompletos = req.body;

  try {
    const pessoaAtualizada = await Pessoa.findOneAndReplace({ _id: id }, dadosCompletos, { new: true });
    if (pessoaAtualizada) {
      res.status(200).json({ message: "Atualização completa realizada com sucesso!", pessoa: pessoaAtualizada });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao substituir pessoa:", error);
    res.status(500).json({ message: "Erro ao substituir pessoa." });
  }
};

export const deletarPessoa = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pessoaDeletada = await Pessoa.findByIdAndDelete(id);
    if (pessoaDeletada) {
      res.status(200).json({ message: "Pessoa deletada com sucesso!" });
    } else {
      res.status(404).json({ message: "Pessoa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    res.status(500).json({ message: "Erro ao deletar pessoa." });
  }
};
