import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, EMPTY, Observable, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]> = new Observable();
  selectedCourseId: number = 0;

  constructor(
    private cursosService: CursosService,
    private modalService: NgbModal,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(id: number) {
    const result$ = this.alertModalService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover o curso?'
    );

    result$
      .pipe(
        take(1),
        switchMap((result) => (result ? this.cursosService.delete(id) : EMPTY))
      )
      .subscribe({
        next: () => this.onRefresh(),
        error: () =>
          this.alertModalService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde.'
          ),
      });
  }
}
