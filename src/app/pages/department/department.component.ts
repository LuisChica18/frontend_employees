import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Department } from 'src/app/_model/department';
import { DepartmentService } from 'src/app/_service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  displayedColumns: string[] = ['idDepartment', 'name', 'description', 'phone', 'enterprise', 'actions'];
  dataSource: MatTableDataSource<Department>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.departmentService.getDepartmentCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // mensaje de confirmación en pantalla
    this.departmentService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.departmentService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(idDepartment: number){
    this.departmentService.eliminar(idDepartment).pipe(switchMap( ()=> {
      return this.departmentService.listar();
    }))
    .subscribe(data => {
      //this.dataSource = new MatTableDataSource(data);
      this.departmentService.setDepartmentCambio(data);
    });
  }

  mostrarMas(e: any){
    this.departmentService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
  }

}
