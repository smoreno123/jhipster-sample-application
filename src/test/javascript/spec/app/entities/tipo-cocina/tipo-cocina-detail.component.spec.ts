import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoCocinaDetailComponent } from 'app/entities/tipo-cocina/tipo-cocina-detail.component';
import { TipoCocina } from 'app/shared/model/tipo-cocina.model';

describe('Component Tests', () => {
  describe('TipoCocina Management Detail Component', () => {
    let comp: TipoCocinaDetailComponent;
    let fixture: ComponentFixture<TipoCocinaDetailComponent>;
    const route = ({ data: of({ tipoCocina: new TipoCocina(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoCocinaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoCocinaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoCocinaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoCocina).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
