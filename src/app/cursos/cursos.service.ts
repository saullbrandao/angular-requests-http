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

  create(curso: any) {
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
