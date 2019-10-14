import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PagoPedidoDeleteDialogComponent } from 'app/entities/pago-pedido/pago-pedido-delete-dialog.component';
import { PagoPedidoService } from 'app/entities/pago-pedido/pago-pedido.service';

describe('Component Tests', () => {
  describe('PagoPedido Management Delete Component', () => {
    let comp: PagoPedidoDeleteDialogComponent;
    let fixture: ComponentFixture<PagoPedidoDeleteDialogComponent>;
    let service: PagoPedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PagoPedidoDeleteDialogComponent]
      })
        .overrideTemplate(PagoPedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoPedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoPedidoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
