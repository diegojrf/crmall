import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AddClienteModalComponent } from "../add-cliente-modal/add-cliente-modal.component";
import { Cliente } from "../model/cliente";
import { ClienteService } from "../service/cliente.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, AfterViewInit {
  public elemento;
  public chave = "";
  public qtdeItens = 15;
  public paginaAtual = 1;
  @ViewChild(AddClienteModalComponent, { static: false })
  modal: AddClienteModalComponent;

  public cliente: Cliente = new Cliente();
  public clientes: Cliente[] = [];

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.buscaPorNome();
  }

  ngOnInit() {}

  public buscaPorNome() {
    // Colocado timeout apenas para visualizar o efeito de carregando
    if (this.chave === "") {
      this.elemento.style.display = "block";
      setTimeout(() => {
        this.clienteService.buscaClientes(this.chave).subscribe(
          (retorno) => {
            this.clientes = retorno;
          },
          (erro) => {
            Swal.fire("Opss!", "Não foi possível buscar os clientes.", "error");
          },
          () => (this.elemento.style.display = "none")
        );
      }, 2000);
    } else {
      this.clienteService.buscaClientes(this.chave).subscribe(
        (retorno) => {
          this.clientes = retorno;
        },
        (erro) => {
          Swal.fire("Opss!", "Não foi possível buscar os clientes.", "error");
        },
        () => (this.elemento.style.display = "none")
      );
    }
  }

  public editaCliente(c: Cliente) {
    this.modal.cliente = c;
    this.modal.nomeEdit = c.nome;
    this.modal.cepOk = true;
    this.abreModal();
  }

  excluiCliente(c: Cliente) {
    Swal.fire({
      titleText: "Atenção!",
      text: "Deseja mesmo excluir " + c.nome + "?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Excluir",
    })
      .then((escolha) => {
        if (escolha.value) {
          this.clienteService.exclui(c.id).subscribe((retorno) => {
            if (retorno) {
              this.toastr.success("Cliente excluído com sucesso!");
              this.chave = "";
              this.buscaPorNome();
            } else {
              this.toastr.error("Não foi possível excluir o cliente!");
            }
          });
        }
      })
      .catch((erro) => {
        this.toastr.error("Não foi possível excluir o cliente!");
      });
  }

  public abreModal() {
    this.modal.show();
  }
}
