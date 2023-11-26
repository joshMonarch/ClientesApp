import { Component, OnInit } from '@angular/core';

import { ClienteService } from './service/cliente.service';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

 clientes: Cliente[];
 paginador: any;

 constructor(
  private clienteService: ClienteService,
  private activatedRoute: ActivatedRoute) {}

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe( params => {
    let page: number = +params.get('page');

    if(!page){ page = 0; }

    this.clienteService.getClientes(page).subscribe(
      response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      }
    );
  }

  );


 }

 delete(cliente: Cliente): void {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.delete(cliente.id).subscribe(
        response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire({
            title: 'Eliminado',
            text: `El cliente ${cliente.nombre} ha sido eliminado`,
            icon: "success"
          });
        }
      )

    }
  });
 }
}
