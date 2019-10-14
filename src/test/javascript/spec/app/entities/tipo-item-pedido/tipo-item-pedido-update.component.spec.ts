import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoItemPedidoUpdateComponent } from 'app/entities/tipo-item-pedido/tipo-item-pedido-update.component';
import { TipoItemPedidoService } from 'app/entities/tipo-item-pedido/tipo-item-pedido.service';
import { TipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

describe('Component Tests', () => {
  describe('TipoItemPedido Management Update Component', () => {
    let comp: TipoItemPedidoUpdateComponent;
    let fixture: ComponentFixture<TipoItemPedidoUpdateComponent>;
    let service: TipoItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoItemPedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoItemPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoItemPedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoItemPedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoItemPedido(123);
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
        const entity = new TipoItemPedido();
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
