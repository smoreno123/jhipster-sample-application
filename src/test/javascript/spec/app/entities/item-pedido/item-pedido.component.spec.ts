import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ItemPedidoComponent } from 'app/entities/item-pedido/item-pedido.component';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';
import { ItemPedido } from 'app/shared/model/item-pedido.model';

describe('Component Tests', () => {
  describe('ItemPedido Management Component', () => {
    let comp: ItemPedidoComponent;
    let fixture: ComponentFixture<ItemPedidoComponent>;
    let service: ItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ItemPedidoComponent],
        providers: []
      })
        .overrideTemplate(ItemPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemPedidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPedidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ItemPedido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.itemPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
