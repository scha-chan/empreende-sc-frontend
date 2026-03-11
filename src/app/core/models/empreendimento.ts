import { Empreendedor } from './empreendedor';
import { Municipio } from './municipio';

export interface Empreendimento {
  id?: number;
  nomeEmpreendimento: string;
  empreendedor: Empreendedor;
  municipio: Municipio;
  segmento: string;
  email: string;
  telefone?: string;
  status: boolean;
  dataCriacao?: string;
  dataAtualizacao?: string;
}

export interface EmpreendimentoCreate {
  nomeEmpreendimento: string;
  empreendedorId: number;
  municipioId: number;
  segmento: string;
  email: string;
  telefone?: string;
  status: boolean;
}

export interface EmpreendimentoUpdate extends EmpreendimentoCreate {
  id: number;
}
