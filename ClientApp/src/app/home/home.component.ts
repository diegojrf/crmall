import { Component, OnInit, ViewChild } from "@angular/core";
import { AddClienteModalComponent } from "../add-cliente-modal/add-cliente-modal.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  public elemento;
  @ViewChild(AddClienteModalComponent, { static: false })
  modal: AddClienteModalComponent;

  constructor() { }

  ngOnInit() {

  }

  abreModal() {
    this.modal.show();
  }

}
