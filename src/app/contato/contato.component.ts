import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/model/contato';
import { ContatoService } from '../shared/service/contato.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id', 'nome', 'email', 'favorito'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions : number[] = [10];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snakBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.formatarTabela();
    this.listarContatos(this.pagina, this.tamanho);
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
        this.listarContatos();
        this.snakBar.open('Contato cadastrado!', 'Sucesso', {
          duration: 2000
        });
        this.formulario.reset();
       });
  }

  listarContatos(pagina = 0, tamanho = 10){
    this.service.getListarContatos(pagina, tamanho).subscribe(
      resposta => {
        this.contatos = resposta.content;
        this.totalElementos = resposta.totalElements;
        this.pagina = resposta.number;
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

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho)
  }

}
