import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EnterpriseEditionComponent } from './pages/enterprise/enterprise-edition/enterprise-edition.component';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';

const routes: Routes = [
  {
    path: 'pages/enterprise', component: EnterpriseComponent, children: [
      { path : 'new', component : EnterpriseEditionComponent },
      { path : 'edition/:id', component : EnterpriseEditionComponent }
    ]
  },
  {
    path: 'pages/department', component: DepartmentComponent
  },
  {
    path: 'pages/employee', component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
