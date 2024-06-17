import { HttpClient } from '@angular/common/http';
import { Exercise, Exercise2 } from '../types/exercise';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private readonly http: HttpClient) {}
  generateExercises(
    target: string,
    goal: string,
    age?: number,
    weight?: number,
    height?: number
  ) {
    return this.http.post<Exercise2[]>(
      'http://localhost:3000/exercise/generate',
      {
        target,
        goal,
        age,
        weight,
        height,
      }
    );
  }
  getExercise(): Observable<Exercise2[]> {
    return this.http.get<Exercise2[]>('http://localhost:3000/exercise');
  }
  createExercise(exercise: Exercise2) {
    return this.http.post('http://localhost:3000/exercise', exercise);
  }

  updateExercise(id: string, exercise: Exercise2) {
    return this.http.put('http://localhost:3000/exercise/' + id, exercise);
  }

  deleteExercise(id: string) {
    return this.http.delete('http://localhost:3000/exercise/' + id);
  }

  getTargets() {
    return this.http.get<string[]>('http://localhost:3000/exercise/targets');
  }

  getExercisesByTarget(target: string) {
    return this.http.get<Exercise2[]>('http://localhost:3000/exercise/target', {
      params: { target },
    });
  }
}
