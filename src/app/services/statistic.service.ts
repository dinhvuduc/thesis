import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Progress } from '../types/progress';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private readonly http: HttpClient) {}

  getGraphData(start: string, end: string, type: 'volume' | 'reps') {
    const token = localStorage.getItem('token');

    return this.http.post<{ data: number[]; date: string[] }>(
      'http://localhost:3000/statistic/graph',
      { start, end, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getProgressess(month?: string) {
    const token = localStorage.getItem('token');

    return this.http.get<Progress[]>('http://localhost:3000/statistic', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: month ? { month } : undefined,
    });
  }

  getStreaksAndRests() {
    const token = localStorage.getItem('token');

    return this.http.get<{ streak: number; rest: number }>(
      'http://localhost:3000/statistic/streak-rest',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
