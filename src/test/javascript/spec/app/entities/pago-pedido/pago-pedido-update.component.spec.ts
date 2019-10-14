import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PagoPedidoUpdateComponent } from 'app/entities/pago-pedido/pago-pedido-update.component';
import { PagoPedidoService } from 'app/entities/pago-pedido/pago-pedido.service';
import { PagoPedido } from 'app/shared/model/pago-pedido.model';

describe('Component Tests', () => {
  describe('PagoPedido Management Update Component', () => {
    let comp: PagoPedidoUpdateComponent;
    let fixture: ComponentFixture<PagoPedidoUpdateComponent>;
    let service: PagoPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PagoPedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PagoPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoPedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoPedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagoPedido(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagoPedido();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
