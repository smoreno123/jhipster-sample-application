import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoItemPedidoComponent } from 'app/entities/tipo-item-pedido/tipo-item-pedido.component';
import { TipoItemPedidoService } from 'app/entities/tipo-item-pedido/tipo-item-pedido.service';
import { TipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

describe('Component Tests', () => {
  describe('TipoItemPedido Management Component', () => {
    let comp: TipoItemPedidoComponent;
    let fixture: ComponentFixture<TipoItemPedidoComponent>;
    let service: TipoItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoItemPedidoComponent],
        providers: []
      })
        .overrideTemplate(TipoItemPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoItemPedidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoItemPedidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoItemPedido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoItemPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
