import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { StatusItemPedidoDeleteDialogComponent } from 'app/entities/status-item-pedido/status-item-pedido-delete-dialog.component';
import { StatusItemPedidoService } from 'app/entities/status-item-pedido/status-item-pedido.service';

describe('Component Tests', () => {
  describe('StatusItemPedido Management Delete Component', () => {
    let comp: StatusItemPedidoDeleteDialogComponent;
    let fixture: ComponentFixture<StatusItemPedidoDeleteDialogComponent>;
    let service: StatusItemPedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [StatusItemPedidoDeleteDialogComponent]
      })
        .overrideTemplate(StatusItemPedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatusItemPedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusItemPedidoService);
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
