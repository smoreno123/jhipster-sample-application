import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IngredienteComponent } from 'app/entities/ingrediente/ingrediente.component';
import { IngredienteService } from 'app/entities/ingrediente/ingrediente.service';
import { Ingrediente } from 'app/shared/model/ingrediente.model';

describe('Component Tests', () => {
  describe('Ingrediente Management Component', () => {
    let comp: IngredienteComponent;
    let fixture: ComponentFixture<IngredienteComponent>;
    let service: IngredienteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IngredienteComponent],
        providers: []
      })
        .overrideTemplate(IngredienteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngredienteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredienteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ingrediente(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ingredientes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
