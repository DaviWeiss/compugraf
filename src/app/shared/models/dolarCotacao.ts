export interface DolarValue {
    data: string;
    value: Array<CotacaoDolarDia>;
}

export interface CotacaoDolarDia {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
}