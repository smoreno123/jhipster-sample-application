import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoPedido } from 'app/shared/model/pago-pedido.model';
import { PagoPedidoService } from './pago-pedido.service';

@Component({
  selector: 'jhi-pago-pedido-delete-dialog',
  templateUrl: './pago-pedido-delete-dialog.component.html'
})
export class PagoPedidoDeleteDialogComponent {
  pagoPedido: IPagoPedido;

  constructor(
    protected pagoPedidoService: PagoPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pagoPedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pagoPedidoListModification',
        content: 'Deleted an pagoPedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pago-pedido-delete-popup',
  template: ''
})
export class PagoPedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagoPedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PagoPedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pagoPedido = pagoPedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pago-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pago-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
