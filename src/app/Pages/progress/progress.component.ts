import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { NgIf } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixAccountCircleFill } from '@ng-icons/remixicon';
import { TrackingService } from '../../services/tracking.service';
import { GraphComponent } from './graph/graph.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticService } from '../../services/statistic.service';
import { ActivatedRoute } from '@angular/router';
import { UserBoxComponent } from '../../components/user-box/user-box.component';

@Component({
  templateUrl: './progress.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgIconComponent,
    GraphComponent,
    CalendarComponent,
    UserBoxComponent,
  ],
})
export class ProgressPageComponent implements OnInit {
  user: User | undefined;
  error = '';
  count = 0;
  rest = 0;
  streak = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.statisticService.getProgressess().subscribe({
      next: (progresses) => {
        this.count = progresses.length;
      },
      error: (error) => {
        this.error = error.error?.message ?? error.message;
      },
    });

    this.statisticService.getStreaksAndRests().subscribe({
      next: ({ streak, rest }) => {
        this.streak = streak;
        this.rest = rest;
      },
      error: (error) => {
        this.error = error.error?.message ?? error.message;
      },
    });
  }
}
