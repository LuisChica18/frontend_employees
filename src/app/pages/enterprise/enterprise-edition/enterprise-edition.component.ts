import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Enterprise } from 'src/app/_model/enterprise';
import { EnterpriseService } from 'src/app/_service/enterprise.service';

@Component({
  selector: 'app-enterprise-edition',
  templateUrl: './enterprise-edition.component.html',
  styleUrls: ['./enterprise-edition.component.css']
})
export class EnterpriseEditionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edition: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'address': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phone': new FormControl('')
    });

    // obtiene el id y verifica si tiene datos para determinar
    //si es inserción o consulta
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      this.initForm();
    });
  }

  get f() { return this.form.controls; }

  initForm(){
    if(this.edition){
      //get enterpise by ID
      this.enterpriseService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEnterprise),
          'address': new FormControl(data.address, Validators.required),
          'name': new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          'phone': new FormControl(data.phone)
        });
      });
    }
  }

  operar(){
    let enterpise = new Enterprise();
    enterpise.idEnterprise = this.form.value['id'];
    enterpise.address = this.form.value['address'];
    enterpise.name = this.form.value['name'];
    enterpise.phone = this.form.value['phone'];

    if(this.edition){
      this.enterpriseService.modificar(enterpise, enterpise.idEnterprise).subscribe(() => {
        this.enterpriseService.listar().subscribe(data => {
          this.enterpriseService.setEnterpriseCambio(data);
          this.enterpriseService.setMensajeCambio('Datos fueron modificados.');
        });
      });
    }else{
      this.enterpriseService.registrar(enterpise).pipe(switchMap( () => {
        return this.enterpriseService.listar();
      }))
      .subscribe(data => {
        this.enterpriseService.setEnterpriseCambio(data);
        this.enterpriseService.setMensajeCambio('Datos fueron registrados.');
      });
    }

    this.router.navigate(['/pages/enterprise']);
  }

}
