import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Department } from 'src/app/_model/department';
import { Employee } from 'src/app/_model/employee';
import { DepartmentService } from 'src/app/_service/department.service';
import { EmployeeService } from 'src/app/_service/employee.service';

@Component({
  selector: 'app-employee-edition',
  templateUrl: './employee-edition.component.html',
  styleUrls: ['./employee-edition.component.css']
})
export class EmployeeEditionComponent implements OnInit {

  departments$: Observable<Department[]>;
  idDepartmentSeleccionado: number;

  form: FormGroup;
  id: number;
  edition: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {

    this.listDepartment();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'surname': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'position': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(''),
      'age': new FormControl('')

    });

    // obtiene el id y verifica si tiene datos para determinar
    //si es inserción o consulta
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      this.initForm();
    });
  }

  listDepartment() {
    this.departments$ = this.departmentService.listar();
  }

  get f() { return this.form.controls; }

  initForm(){
    if(this.edition){
      //get employee by ID
      this.employeeService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEmployee),
          'surname': new FormControl(data.surname, Validators.required),
          'name': new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          'position': new FormControl(data.position, [Validators.required, Validators.minLength(3)]),
          'email': new FormControl(data.email),
          'age': new FormControl(data.age)
        });
        this.idDepartmentSeleccionado = data.department.idDepartment;
      });
    }
  }

  operar(){
    let employee = new Employee();
    employee.idEmployee = this.form.value['id'];
    employee.surname = this.form.value['surname'];
    employee.name = this.form.value['name'];
    employee.position = this.form.value['position'];
    employee.email = this.form.value['email'];
    employee.age = this.form.value['age'];

    let department = new Department();
    department.idDepartment = this.idDepartmentSeleccionado;
    employee.department = department;

    if(this.edition){
      this.employeeService.modificar(employee, employee.idEmployee).subscribe(() => {
        this.employeeService.listar().subscribe(data => {
          this.employeeService.setEmployeeCambio(data);
          this.employeeService.setMensajeCambio('Datos fueron modificados.');
        });
      });
    }else{
      this.employeeService.registrar(employee).pipe(switchMap( () => {
        return this.employeeService.listar();
      }))
      .subscribe(data => {
        this.employeeService.setEmployeeCambio(data);
        this.employeeService.setMensajeCambio('Datos fueron registrados.');
      });
    }

    this.router.navigate(['/pages/employee']);
  }

}
