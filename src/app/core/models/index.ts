export interface Empreendimento {
  id?: number;
  nomeEmpreendimento: string;
  empreendedor: Empreendedor;
  municipio: Municipio;
  segmento: string;
  email: string;
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
  status: boolean;
}

export interface EmpreendimentoUpdate extends EmpreendimentoCreate {
  id: number;
}

export interface Empreendedor {
  id?: number;
  nome: string;
  email?: string;
  telefone?: string;
  dataCriacao?: string;
}

export interface Municipio {
  id?: number;
  nome: string;
  estado: string;
  codigoIbge?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}
