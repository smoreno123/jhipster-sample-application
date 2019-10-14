import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComensal, Comensal } from 'app/shared/model/comensal.model';
import { ComensalService } from './comensal.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-comensal-update',
  templateUrl: './comensal-update.component.html'
})
export class ComensalUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    dni: [],
    nombre: [],
    usuario: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected comensalService: ComensalService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ comensal }) => {
      this.updateForm(comensal);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(comensal: IComensal) {
    this.editForm.patchValue({
      id: comensal.id,
      dni: comensal.dni,
      nombre: comensal.nombre,
      usuario: comensal.usuario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const comensal = this.createFromForm();
    if (comensal.id !== undefined) {
      this.subscribeToSaveResponse(this.comensalService.update(comensal));
    } else {
      this.subscribeToSaveResponse(this.comensalService.create(comensal));
    }
  }

  private createFromForm(): IComensal {
    return {
      ...new Comensal(),
      id: this.editForm.get(['id']).value,
      dni: this.editForm.get(['dni']).value,
      nombre: this.editForm.get(['nombre']).value,
      usuario: this.editForm.get(['usuario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComensal>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
