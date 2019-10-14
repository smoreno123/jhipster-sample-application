import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoItemPedidoDetailComponent } from 'app/entities/tipo-item-pedido/tipo-item-pedido-detail.component';
import { TipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

describe('Component Tests', () => {
  describe('TipoItemPedido Management Detail Component', () => {
    let comp: TipoItemPedidoDetailComponent;
    let fixture: ComponentFixture<TipoItemPedidoDetailComponent>;
    const route = ({ data: of({ tipoItemPedido: new TipoItemPedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoItemPedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoItemPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoItemPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoItemPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
