import { Moment } from 'moment';
import { IPedido } from 'app/shared/model/pedido.model';
import { IItemPedido } from 'app/shared/model/item-pedido.model';

export interface IStatusItemPedido {
  id?: number;
  preparado?: boolean;
  horaInicio?: Moment;
  horaFinalizacion?: Moment;
  pedido?: IPedido;
  itemPedido?: IItemPedido;
}

export class StatusItemPedido implements IStatusItemPedido {
  constructor(
    public id?: number,
    public preparado?: boolean,
    public horaInicio?: Moment,
    public horaFinalizacion?: Moment,
    public pedido?: IPedido,
    public itemPedido?: IItemPedido
  ) {
    this.preparado = this.preparado || false;
  }
}
