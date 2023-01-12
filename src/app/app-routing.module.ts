import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentEditionComponent } from './pages/department/department-edition/department-edition.component';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployeeEditionComponent } from './pages/employee/employee-edition/employee-edition.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EnterpriseEditionComponent } from './pages/enterprise/enterprise-edition/enterprise-edition.component';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'pages/enterprise', component: EnterpriseComponent, children: [
      { path : 'new', component : EnterpriseEditionComponent },
      { path : 'edition/:id', component : EnterpriseEditionComponent }
    ]
  },
  {
    path: 'pages/department', component: DepartmentComponent, children: [
      { path : 'new', component : DepartmentEditionComponent },
      { path : 'edition/:id', component : DepartmentEditionComponent }
    ]
  },
  {
    path: 'pages/employee', component: EmployeeComponent, children: [
      { path : 'new', component : EmployeeEditionComponent },
      { path : 'edition/:id', component : EmployeeEditionComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
