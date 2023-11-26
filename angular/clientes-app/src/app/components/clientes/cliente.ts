import { ICliente } from './interfaces/cliente.interface';

export class Cliente implements ICliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;

}
