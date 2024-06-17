import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tracking } from '../types/tracking';
import { Progress } from '../types/progress';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  confirm$ = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  trackExercises(exercises: any[]) {
    const token = localStorage.getItem('token');

    return this.http.post(
      'http://localhost:3000/tracking',
      {
        exercises,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getTrackingExercises(date?: string, month?: string) {
    const token = localStorage.getItem('token');
    let params = {};

    if (date) params = { date };
    if (month) params = { month };

    return this.http.get<Progress>('http://localhost:3000/tracking', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }

  saveTrackingProgress(
    trackingId: string,
    setIndex: number,
    weight: number,
    reps: number
  ) {
    const token = localStorage.getItem('token');

    return this.http.post(
      'http://localhost:3000/tracking/progress',
      {
        trackingId,
        setIndex,
        weight,
        reps,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getExercisesFromDate(date: string) {
    const token = localStorage.getItem('token');

    return this.http.post<Tracking[]>(
      'http://localhost:3000/tracking/from-date',
      {
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // confirmTrackingsFromPrevious(target: string) {
  //   const token = localStorage.getItem('token');

  //   return this.http.post<Tracking[]>(
  //     'http://localhost:3000/tracking/previous/confirm',
  //     {
  //       target,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  // }

  deleteTracking(id: string) {
    const token = localStorage.getItem('token');

    return this.http.delete<Tracking[]>(
      'http://localhost:3000/tracking/' + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  addSet(trackingId: string) {
    const token = localStorage.getItem('token');

    return this.http.post(
      'http://localhost:3000/tracking/add-set/',
      {
        trackingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteSet(trackingId: string, index: number) {
    const token = localStorage.getItem('token');

    return this.http.post(
      'http://localhost:3000/tracking/delete-set',
      {
        trackingId,
        index,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  startTracking(progressId: string) {
    const token = localStorage.getItem('token');

    return this.http.get('http://localhost:3000/tracking/start/' + progressId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  submit(progressId: string) {
    const token = localStorage.getItem('token');

    return this.http.get(
      'http://localhost:3000/tracking/submit/' + progressId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  reset(progressId: string) {
    const token = localStorage.getItem('token');

    return this.http.delete(
      'http://localhost:3000/tracking/reset/' + progressId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
