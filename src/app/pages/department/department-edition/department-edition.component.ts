import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Department } from 'src/app/_model/department';
import { Enterprise } from 'src/app/_model/enterprise';
import { DepartmentService } from 'src/app/_service/department.service';
import { EnterpriseService } from 'src/app/_service/enterprise.service';

@Component({
  selector: 'app-department-edition',
  templateUrl: './department-edition.component.html',
  styleUrls: ['./department-edition.component.css']
})
export class DepartmentEditionComponent implements OnInit {

  enterprises$: Observable<Enterprise[]>;
  idEnterpriseSeleccionado: number;

  form: FormGroup;
  id: number;
  edition: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit(): void {

    this.listEnterprise();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'description': new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  listEnterprise() {
    this.enterprises$ = this.enterpriseService.listar();
  }

  get f() { return this.form.controls; }

  initForm(){
    if(this.edition){
      //get department by ID
      this.departmentService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idDepartment),
          'description': new FormControl(data.description, Validators.required),
          'name': new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          'phone': new FormControl(data.phone)
        });
        this.idEnterpriseSeleccionado = data.enterprise.idEnterprise;
      });
    }
  }

  operar(){
    let department = new Department();
    department.idDepartment = this.form.value['id'];
    department.description = this.form.value['description'];
    department.name = this.form.value['name'];
    department.phone = this.form.value['phone'];

    let enterprise = new Enterprise();
    enterprise.idEnterprise = this.idEnterpriseSeleccionado;
    department.enterprise = enterprise;

    if(this.edition){
      this.departmentService.modificar(department, department.idDepartment).subscribe(() => {
        this.departmentService.listar().subscribe(data => {
          this.departmentService.setDepartmentCambio(data);
          this.departmentService.setMensajeCambio('Datos fueron modificados.');
        });
      });
    }else{
      this.departmentService.registrar(department).pipe(switchMap( () => {
        return this.departmentService.listar();
      }))
      .subscribe(data => {
        this.departmentService.setDepartmentCambio(data);
        this.departmentService.setMensajeCambio('Datos fueron registrados.');
      });
    }

    this.router.navigate(['/pages/department']);
  }

}
