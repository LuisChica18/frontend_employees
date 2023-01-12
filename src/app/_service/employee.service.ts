import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../_model/employee';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends GenericService<Employee>{

  private enterpriseCambio = new Subject<Employee[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/employees`);
  }

  listarPageable(p:number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  // get set
  getEmployeeCambio() {
    return this.enterpriseCambio.asObservable();
  }

  setEmployeeCambio(enterprise: Employee[]) {
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

