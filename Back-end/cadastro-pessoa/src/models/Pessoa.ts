import mongoose, { Document, Schema } from 'mongoose';

interface umaPessoa extends Document {
  nome: string;
  idade: number;
}

const pessoaSchema: Schema = new Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
});

const Pessoa = mongoose.model<umaPessoa>('Pessoa', pessoaSchema);

export default Pessoa;
