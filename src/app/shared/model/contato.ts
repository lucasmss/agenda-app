export class Contato {
    id!: BigInteger;
    nome!: string;
    email!: string;
    favorito!: boolean;

    constructor(name: string, email: string){
        this.nome = name;
        this.email = email;
    }
}