import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, AfterViewInit {

  constructor(private elemento: ElementRef) { }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }

  public show() {
    $(this.divModal).modal('show');
  }

  public hide() {
    $(this.divModal).modal('hide');
  }

  private get divModal(): HTMLElement {
    return this.elemento.nativeElement.firstChild as HTMLElement;
  }

}
