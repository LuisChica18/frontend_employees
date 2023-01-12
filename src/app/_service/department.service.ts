import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../_model/department';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends GenericService<Department>{

  private enterpriseCambio = new Subject<Department[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/departments`);
  }

  listarPageable(p:number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  // get set
  getDepartmentCambio() {
    return this.enterpriseCambio.asObservable();
  }

  setDepartmentCambio(enterprise: Department[]) {
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
