import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API);
  }

  getById(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
