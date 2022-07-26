import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/model/contato';
import { ContatoService } from '../shared/service/contato.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog 
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
        let lista: Contato[] = [... this.contatos, resposta]
         this.contatos = lista;
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

  atualizarFoto(event: any, contatos: Contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
            .upload(contatos, formData)
            .subscribe(response => this.listarContatos());
    }
  }

  visualizarContato(contatos: Contato){
    this.dialog.open( ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contatos
    })
  }

}
