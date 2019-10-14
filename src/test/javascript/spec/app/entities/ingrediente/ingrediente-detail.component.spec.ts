import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IngredienteDetailComponent } from 'app/entities/ingrediente/ingrediente-detail.component';
import { Ingrediente } from 'app/shared/model/ingrediente.model';

describe('Component Tests', () => {
  describe('Ingrediente Management Detail Component', () => {
    let comp: IngredienteDetailComponent;
    let fixture: ComponentFixture<IngredienteDetailComponent>;
    const route = ({ data: of({ ingrediente: new Ingrediente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IngredienteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IngredienteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IngredienteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ingrediente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
