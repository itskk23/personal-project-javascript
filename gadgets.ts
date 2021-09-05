export enum EStatus {
    success = "succesfully ended",
    fail = 'something went wrong'

}

export interface IStore <T> {
    [i: string]: T
}


export interface IScenario {
    index: number;
    meta: IMeta;
    call: (store: IStore <any>) => void;
    restore: (store: IStore <any>) => void
}


export interface IMeta {
    title: string,
    description: string
}


export interface IError<T> {
    name: string,
    message: string,
    stack: string
}

type araferi = null;

export interface Item {
    index: number,
    meta: IMeta,
    storeBefore: IStore<any>,
    storeAfter: IStore<any>,
    error: araferi | IError<any>
}