import { Byte } from "@angular/compiler/src/util";

export class Contato {
    id!: BigInteger;
    nome!: string;
    email!: string;
    favorito!: boolean;
    foto!: any;

    constructor(name: string, email: string){
        this.nome = name;
        this.email = email;
    }
}