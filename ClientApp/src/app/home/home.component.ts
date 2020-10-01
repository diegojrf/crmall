import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AddClienteModalComponent } from "../add-cliente-modal/add-cliente-modal.component";
import { Cliente } from "../model/cliente";
import { ClienteService } from "../service/cliente.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  public elemento;
  public chave = "";
  public qtdeItens = 15;
  public cepOk = false;
  @ViewChild(AddClienteModalComponent, { static: false })
  modal: AddClienteModalComponent;

  public cliente: Cliente = new Cliente();
  public clientes: Cliente[] = [];

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.clienteService.buscaClientes("die").subscribe(
      (retorno) => {
        this.clientes = retorno;
        console.log(retorno);
      },
      (erro) => {
        Swal.fire("Opss!", "Não foi possível buscar os clientes.", "error");
      }
    );
  }

  teste() {
    this.toastr.success("Testando o Toastr na prova", "Teste");
    Swal.fire("Teste", "Testando sweetalert", "success");
  }

  abreModal() {
    this.modal.show();
  }
}
