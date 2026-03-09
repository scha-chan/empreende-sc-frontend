export enum SegmentoAtuacao {
  TECNOLOGIA = 'tecnologia',
  COMERCIO = 'comercio',
  INDUSTRIA = 'industria',
  SERVICOS = 'servicos',
  AGRONEGOCIO = 'agronegocio',
}

export const SEGMENTO_ATUACAO_LABELS: Record<SegmentoAtuacao, string> = {
  [SegmentoAtuacao.TECNOLOGIA]: 'Tecnologia',
  [SegmentoAtuacao.COMERCIO]: 'Comércio',
  [SegmentoAtuacao.INDUSTRIA]: 'Indústria',
  [SegmentoAtuacao.SERVICOS]: 'Serviços',
  [SegmentoAtuacao.AGRONEGOCIO]: 'Agronegócio',
};

export const SEGMENTO_ATUACAO_OPTIONS = Object.values(SegmentoAtuacao).map((value) => ({
  value,
  label: SEGMENTO_ATUACAO_LABELS[value],
}));
