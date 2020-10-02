import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { ModalComponent } from "../modal/modal.component";
import { Cliente } from "../model/cliente";
import { ClienteService } from "../service/cliente.service";

@Component({
  selector: "app-add-cliente-modal",
  templateUrl: "./add-cliente-modal.component.html",
})
export class AddClienteModalComponent implements OnInit, AfterViewInit {
  public elemento;
  public cepOk = false;
  public nomeEdit = "";
  public estados = [];
  @ViewChild(ModalComponent, { static: false })
  modal: ModalComponent;

  @Output()
  envia: EventEmitter<any> = new EventEmitter<any>();

  public cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {}

  public gravar() {
    this.elemento.style.display = "block";
    this.clienteService.grava(this.cliente).subscribe(
      (retorno) => {
        if (retorno) {
          Swal.fire("Ok", "Cliente cadastrado com sucesso!", "success");
          this.envia.emit(true);
          this.hide();
        } else {
          Swal.fire(
            "Opss!",
            "Ocorreu um problema ao cadastrar o cliente!",
            "error"
          );
        }
      },
      (erro) => {
        console.log(erro);
        let msg = "";
        try {
          erro.error.forEach((elemento) => {
            msg += elemento.msg + "<br>";
          });
          Swal.fire("Opss!", msg, "error");
        } catch {
          Swal.fire("Opss!", "Não foi possível cadastrar o cliente", "error");
        }
      },
      () => (this.elemento.style.display = "none")
    );
  }

  buscaCep() {
    if (this.cliente.cep.length === 8) {
      this.http
        .get(
          `https://viacep.com.br/ws/${this.cliente.cep.replace("-", "")}/json/`
        )
        .subscribe(
          (retorno) => {
            if (!retorno["erro"]) {
              this.toastr.success("CEP localizado!");
              this.cepOk = true;
              this.cliente.endereco = retorno["logradouro"];
              this.cliente.bairro = retorno["bairro"];
              this.cliente.cidade = retorno["localidade"];
              this.cliente.estado = retorno["uf"];
            } else {
              this.limpaEndereco();
            }
          },
          (erro) => {
            this.limpaEndereco();
          }
        );
    }
  }

  confirmaCep() {
    console.log(this.cliente.cep);
    if (this.cliente.cep.length < 8) {
      console.log("aqui");
      this.buscaCep();
    }
  }

  limpaEndereco() {
    this.toastr.error("CEP não localizado!");
    this.cepOk = false;
    this.cliente.endereco = "";
    this.cliente.numero = "";
    this.cliente.bairro = "";
    this.cliente.complemento = "";
    this.cliente.estado = "";
    this.cliente.cidade = "";
  }

  public show() {
    this.modal.show();
  }

  public hide() {
    this.cliente = new Cliente();
    this.cepOk = false;
    this.modal.hide();
  }

  public auxData(evento) {
    if (evento.length === 10) {
      if (evento.substr(0, 1) !== "0") {
        return evento;
      }
    }
  }
}
