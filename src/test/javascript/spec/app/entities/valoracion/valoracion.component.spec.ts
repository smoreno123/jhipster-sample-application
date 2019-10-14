import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ValoracionComponent } from 'app/entities/valoracion/valoracion.component';
import { ValoracionService } from 'app/entities/valoracion/valoracion.service';
import { Valoracion } from 'app/shared/model/valoracion.model';

describe('Component Tests', () => {
  describe('Valoracion Management Component', () => {
    let comp: ValoracionComponent;
    let fixture: ComponentFixture<ValoracionComponent>;
    let service: ValoracionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ValoracionComponent],
        providers: []
      })
        .overrideTemplate(ValoracionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValoracionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValoracionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Valoracion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.valoracions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
