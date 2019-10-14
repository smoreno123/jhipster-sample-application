import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MesaUpdateComponent } from 'app/entities/mesa/mesa-update.component';
import { MesaService } from 'app/entities/mesa/mesa.service';
import { Mesa } from 'app/shared/model/mesa.model';

describe('Component Tests', () => {
  describe('Mesa Management Update Component', () => {
    let comp: MesaUpdateComponent;
    let fixture: ComponentFixture<MesaUpdateComponent>;
    let service: MesaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MesaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MesaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MesaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MesaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mesa(123);
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
        const entity = new Mesa();
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
