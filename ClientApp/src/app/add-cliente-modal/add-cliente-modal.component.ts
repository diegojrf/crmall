import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-cliente-modal',
  templateUrl: './add-cliente-modal.component.html'
})
export class AddClienteModalComponent implements OnInit {
  public elemento;
  @ViewChild(ModalComponent, { static: false })
  modal: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

}
