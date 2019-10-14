import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';
import { IIngrediente } from 'app/shared/model/ingrediente.model';
import { IMenu } from 'app/shared/model/menu.model';
import { IValoracion } from 'app/shared/model/valoracion.model';
import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';
import { IPedido } from 'app/shared/model/pedido.model';

export interface IItemPedido {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  tiempoPreparacion?: number;
  tipoItemPedidos?: ITipoItemPedido[];
  tipoCocinas?: ITipoCocina[];
  ingredientes?: IIngrediente[];
  menus?: IMenu[];
  valoracions?: IValoracion[];
  statuses?: IStatusItemPedido[];
  pedidos?: IPedido[];
}

export class ItemPedido implements IItemPedido {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public tiempoPreparacion?: number,
    public tipoItemPedidos?: ITipoItemPedido[],
    public tipoCocinas?: ITipoCocina[],
    public ingredientes?: IIngrediente[],
    public menus?: IMenu[],
    public valoracions?: IValoracion[],
    public statuses?: IStatusItemPedido[],
    public pedidos?: IPedido[]
  ) {}
}
