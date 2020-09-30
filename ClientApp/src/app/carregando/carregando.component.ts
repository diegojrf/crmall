import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-carregando",
  templateUrl: "./carregando.component.html"
})
export class CarregandoComponent implements OnInit, AfterViewInit {
  @ViewChild("travaTela", { static: false })
  travaTela: ElementRef;

  @Output()
  elemento = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.elemento.emit(this.travaTela.nativeElement);
  }

}
