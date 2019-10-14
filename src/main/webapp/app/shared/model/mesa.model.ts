import { IPedido } from 'app/shared/model/pedido.model';

export interface IMesa {
  id?: number;
  numMesa?: number;
  capacidad?: number;
  pedidos?: IPedido[];
}

export class Mesa implements IMesa {
  constructor(public id?: number, public numMesa?: number, public capacidad?: number, public pedidos?: IPedido[]) {}
}
