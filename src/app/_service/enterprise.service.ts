import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Enterprise } from '../_model/enterprise';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends GenericService<Enterprise>{

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/enterprises`);
  }
}
