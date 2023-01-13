import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [course.id],
      nome: [
        course.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  hasError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.touched && field?.errors;
  }

  onSubmit() {
    this.submitted = true;

    let successMsg = 'Curso criado com sucesso!';
    let errorMsg = 'Erro ao criar curso, tente novamente.';

    if (this.form.value.id) {
      successMsg = 'Curso atualizado com sucesso!';
      errorMsg = 'Erro ao atualizar o curso, tente novamente.';
    }

    if (this.form.valid) {
      this.cursosService.save(this.form.value).subscribe({
        next: () => {
          this.modal.showAlertSuccess(successMsg);
          this.location.back();
        },
        error: () => {
          this.modal.showAlertDanger(errorMsg);
        },
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('Cancel');
  }
}
