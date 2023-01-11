import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  cantidad: number;

  constructor(
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit(): void {
    this.enterpriseService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(idPaciente: number){
    /*
    this.enterpriseService.eliminar(idPaciente).pipe(switchMap( ()=> {
      return this.enterpriseService.listar();
    }))
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      //this.enterpriseService.setPacienteCambio(data);
    });
    */
  }

  mostrarMas(e: any){
    /*
    this.enterpriseService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
    */
  }

}
