import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IngredienteUpdateComponent } from 'app/entities/ingrediente/ingrediente-update.component';
import { IngredienteService } from 'app/entities/ingrediente/ingrediente.service';
import { Ingrediente } from 'app/shared/model/ingrediente.model';

describe('Component Tests', () => {
  describe('Ingrediente Management Update Component', () => {
    let comp: IngredienteUpdateComponent;
    let fixture: ComponentFixture<IngredienteUpdateComponent>;
    let service: IngredienteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IngredienteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IngredienteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngredienteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredienteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ingrediente(123);
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
        const entity = new Ingrediente();
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
