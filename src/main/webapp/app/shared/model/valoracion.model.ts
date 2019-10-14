import { Moment } from 'moment';
import { IPedido } from 'app/shared/model/pedido.model';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { IComensal } from 'app/shared/model/comensal.model';

export interface IValoracion {
  id?: number;
  nota?: number;
  observaciones?: string;
  fecha?: Moment;
  pedido?: IPedido;
  itemPedido?: IItemPedido;
  comensal?: IComensal;
}

export class Valoracion implements IValoracion {
  constructor(
    public id?: number,
    public nota?: number,
    public observaciones?: string,
    public fecha?: Moment,
    public pedido?: IPedido,
    public itemPedido?: IItemPedido,
    public comensal?: IComensal
  ) {}
}
