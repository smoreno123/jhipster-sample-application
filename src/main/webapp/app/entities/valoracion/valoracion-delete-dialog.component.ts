import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IValoracion } from 'app/shared/model/valoracion.model';
import { ValoracionService } from './valoracion.service';

@Component({
  selector: 'jhi-valoracion-delete-dialog',
  templateUrl: './valoracion-delete-dialog.component.html'
})
export class ValoracionDeleteDialogComponent {
  valoracion: IValoracion;

  constructor(
    protected valoracionService: ValoracionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.valoracionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'valoracionListModification',
        content: 'Deleted an valoracion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-valoracion-delete-popup',
  template: ''
})
export class ValoracionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ valoracion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ValoracionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.valoracion = valoracion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/valoracion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/valoracion', { outlets: { popup: null } }]);
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
