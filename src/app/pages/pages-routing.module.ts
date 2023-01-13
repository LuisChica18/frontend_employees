import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { DepartmentEditionComponent } from './department/department-edition/department-edition.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeEditionComponent } from './employee/employee-edition/employee-edition.component';
import { EmployeeComponent } from './employee/employee.component';
import { EnterpriseEditionComponent } from './enterprise/enterprise-edition/enterprise-edition.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },
  {
    path: 'enterprise', component: EnterpriseComponent, children: [
      { path: 'new', component: EnterpriseEditionComponent },
      { path: 'edition/:id', component: EnterpriseEditionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'department', component: DepartmentComponent, children: [
      { path : 'new', component : DepartmentEditionComponent },
      { path : 'edition/:id', component : DepartmentEditionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'employee', component: EmployeeComponent, children: [
      { path : 'new', component : EmployeeEditionComponent },
      { path : 'edition/:id', component : EmployeeEditionComponent }
    ], canActivate: [GuardService]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
