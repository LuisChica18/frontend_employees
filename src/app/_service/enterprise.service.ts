import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enterprise } from '../_model/enterprise';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends GenericService<Enterprise>{

  private enterpriseCambio = new Subject<Enterprise[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/enterprises`);
  }

  // get set
  getEnterpriseCambio() {
    return this.enterpriseCambio.asObservable();
  }

  setEnterpriseCambio(enterprise: Enterprise[]) {
    this.enterpriseCambio.next(enterprise);
  }

  // Manejo de mensajes en pantalla (reactivo)
  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
