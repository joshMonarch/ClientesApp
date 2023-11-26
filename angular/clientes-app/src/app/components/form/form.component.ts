import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/service/cliente.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit{

  public titulo: string = "Crear cliente";
  private cliente: Cliente = new Cliente();
  private errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  getErrores(): string[] {
    return this.errores;
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        );
       }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next:
        cliente => {
          this.router.navigate(['/clientes'])
          swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito`, 'success')
        },
      error:
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código de error desde el backend: ' + err.status)
          console.error(err.error.errors);
        }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado', `${json.mensaje}<br>Cliente actualizado: ${json.cliente.nombre}`, 'success')
        }
      );
  }
}
