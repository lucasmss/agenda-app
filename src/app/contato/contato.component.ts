import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/model/contato';
import { ContatoService } from '../shared/service/contato.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder 
    ) {}

  ngOnInit(): void {
    this.formatarTabela();
    this.listarContatos();
  }

  formatarTabela(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  salvar(){
    const formsValue = this.formulario.value;
    const contato: Contato = new Contato(formsValue.nome, formsValue.email);
    
    this.service.save(contato).subscribe(
       resposta => {
         this.contatos.push(resposta);
       }
     );
  }

  listarContatos(){
    this.service.getListarContatos().subscribe(
      resposta => {
        this.contatos = resposta;
      }
    );
  }

  favoritar(contatos: Contato){
    this.service.favoritar(contatos).subscribe(response => {
      contatos.favorito = !contatos.favorito;
    })

  }

}
