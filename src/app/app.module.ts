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

@NgModule({
  declarations: [
    AppComponent,
    EnterpriseComponent,
    DepartmentComponent,
    EmployeeComponent,
    EnterpriseEditionComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
