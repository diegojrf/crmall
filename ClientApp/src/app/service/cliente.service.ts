import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from "../model/cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private url = "https://localhost:5001/Cliente";

  constructor(private http: HttpClient) { }

  public grava(cliente: Cliente) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post(this.url, cliente, config);
  }

  public exclui(id: number) {
    const params = new HttpParams().set("id", id.toString());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    };
    return this.http.delete<boolean>(this.url, config);
  }

  public buscaClientes(nome: string) {
    const params = new HttpParams().set("chave", nome);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    };
    return this.http.get<Cliente[]>(this.url, config);
  }
}
