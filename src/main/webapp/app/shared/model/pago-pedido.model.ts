import { IPedido } from 'app/shared/model/pedido.model';
import { IComensal } from 'app/shared/model/comensal.model';

export interface IPagoPedido {
  id?: number;
  cantidad?: number;
  pedido?: IPedido;
  comensal?: IComensal;
}

export class PagoPedido implements IPagoPedido {
  constructor(public id?: number, public cantidad?: number, public pedido?: IPedido, public comensal?: IComensal) {}
}
