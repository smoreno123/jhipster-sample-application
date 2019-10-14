import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMesa } from 'app/shared/model/mesa.model';
import { MesaService } from './mesa.service';

@Component({
  selector: 'jhi-mesa-delete-dialog',
  templateUrl: './mesa-delete-dialog.component.html'
})
export class MesaDeleteDialogComponent {
  mesa: IMesa;

  constructor(protected mesaService: MesaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mesaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mesaListModification',
        content: 'Deleted an mesa'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mesa-delete-popup',
  template: ''
})
export class MesaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mesa }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MesaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mesa = mesa;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mesa', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mesa', { outlets: { popup: null } }]);
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
