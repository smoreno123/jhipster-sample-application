import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoItemPedidoDeleteDialogComponent } from 'app/entities/tipo-item-pedido/tipo-item-pedido-delete-dialog.component';
import { TipoItemPedidoService } from 'app/entities/tipo-item-pedido/tipo-item-pedido.service';

describe('Component Tests', () => {
  describe('TipoItemPedido Management Delete Component', () => {
    let comp: TipoItemPedidoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoItemPedidoDeleteDialogComponent>;
    let service: TipoItemPedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoItemPedidoDeleteDialogComponent]
      })
        .overrideTemplate(TipoItemPedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoItemPedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoItemPedidoService);
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
