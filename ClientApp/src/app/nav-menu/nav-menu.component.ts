import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { ClienteService } from "../service/cliente.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;
  public elemento;

  constructor(private clienteService: ClienteService) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  testarConexao() {
    this.elemento.style.display = "block";
    this.clienteService.testaConexao().subscribe(
      (retorno) => {
        if (retorno) {
          Swal.fire(
            "Ok!",
            "Encontrei o endpoint e a conexão ao banco foi realizada com sucesso.",
            "success"
          );
        } else {
          Swal.fire(
            "Opss!",
            "Encontrei o endpoint, mas não consegui realizar a conexão com o banco.",
            "warning"
          );
        }
      },
      (erro) =>
        Swal.fire("Opss!", "Não consegui achar o endpoint da API.", "warning"),
      () => (this.elemento.style.display = "none")
    );
  }
}
