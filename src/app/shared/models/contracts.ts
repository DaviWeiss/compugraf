export interface Contracts {
    contrato: Array<Contract>;
}

export interface Contract {
    key: string;
    data: ContractData;
}

export interface ContractData {
    name: string;
    cep: string;
    quantity: string;
    distance: string;
}