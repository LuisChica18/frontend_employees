import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { EnterpriseEditionComponent } from './enterprise/enterprise-edition/enterprise-edition.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentEditionComponent } from './department/department-edition/department-edition.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditionComponent } from './employee/employee-edition/employee-edition.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        PagesRoutingModule,
    ],
    exports: [],
    declarations: [
        EnterpriseComponent,
        EnterpriseEditionComponent,
        DepartmentComponent,
        DepartmentEditionComponent,
        EmployeeComponent,
        EmployeeEditionComponent,
        LayoutComponent,
        InicioComponent,
    ],
    providers: [],
})
export class PagesModule { }
