import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoCocinaComponent } from 'app/entities/tipo-cocina/tipo-cocina.component';
import { TipoCocinaService } from 'app/entities/tipo-cocina/tipo-cocina.service';
import { TipoCocina } from 'app/shared/model/tipo-cocina.model';

describe('Component Tests', () => {
  describe('TipoCocina Management Component', () => {
    let comp: TipoCocinaComponent;
    let fixture: ComponentFixture<TipoCocinaComponent>;
    let service: TipoCocinaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoCocinaComponent],
        providers: []
      })
        .overrideTemplate(TipoCocinaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoCocinaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoCocinaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoCocina(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoCocinas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
