import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AddClienteModalComponent } from "../add-cliente-modal/add-cliente-modal.component";
import { Cliente } from "../model/cliente";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  public elemento;
  public qtdeItens = 15;
  public cepOk = false;
  @ViewChild(AddClienteModalComponent, { static: false })
  modal: AddClienteModalComponent;

  public cliente: Cliente = new Cliente();
  public clientes: Cliente[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  abreModal() {
    this.modal.show();
  }

}
