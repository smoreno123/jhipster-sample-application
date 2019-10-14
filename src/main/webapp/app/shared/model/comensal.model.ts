import { IUser } from 'app/core/user/user.model';
import { IValoracion } from 'app/shared/model/valoracion.model';
import { IPagoPedido } from 'app/shared/model/pago-pedido.model';

export interface IComensal {
  id?: number;
  dni?: string;
  nombre?: string;
  usuario?: IUser;
  valoracions?: IValoracion[];
  pagos?: IPagoPedido[];
}

export class Comensal implements IComensal {
  constructor(
    public id?: number,
    public dni?: string,
    public nombre?: string,
    public usuario?: IUser,
    public valoracions?: IValoracion[],
    public pagos?: IPagoPedido[]
  ) {}
}
