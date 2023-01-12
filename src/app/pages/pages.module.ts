import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { EnterpriseEditionComponent } from './pages/enterprise/enterprise-edition/enterprise-edition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentEditionComponent } from './pages/department/department-edition/department-edition.component';
import { EmployeeEditionComponent } from './pages/employee/employee-edition/employee-edition.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterpriseComponent,
    DepartmentComponent,
    EmployeeComponent,
    EnterpriseEditionComponent,
    DepartmentEditionComponent,
    EmployeeEditionComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule, //Formularios
    FormsModule, //ngModel
  ],
  providers: [],
})
export class pagesModule { }
