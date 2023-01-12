import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Enterprise } from 'src/app/_model/enterprise';
import { EnterpriseService } from 'src/app/_service/enterprise.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  displayedColumns: string[] = ['idEnterprise', 'name', 'address', 'phone', 'actions'];
  dataSource: MatTableDataSource<Enterprise>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(
    private enterpriseService: EnterpriseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.enterpriseService.getEnterpriseCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // mensaje de confirmación en pantalla
    this.enterpriseService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.enterpriseService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(idEnterprise: number){
    this.enterpriseService.eliminar(idEnterprise).pipe(switchMap( ()=> {
      return this.enterpriseService.listar();
    }))
    .subscribe(data => {
      //this.dataSource = new MatTableDataSource(data);
      this.enterpriseService.setEnterpriseCambio(data);
    });
  }

  mostrarMas(e: any){
    this.enterpriseService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
  }

}
