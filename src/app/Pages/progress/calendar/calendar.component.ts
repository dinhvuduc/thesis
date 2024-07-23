import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthModule } from 'angular-calendar';
import dayjs from 'dayjs';
import { StatisticService } from '../../../services/statistic.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { Tracking } from '../../../types/tracking';
import { Progress } from '../../../types/progress';
import { ExerciseComponent } from '../../../components/exercise/exercise.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './calendar.component.html',
  standalone: true,
  selector: 'app-calendar',
  imports: [
    CalendarMonthModule,
    ButtonComponent,
    ExerciseComponent,
    NgFor,
    NgIf,
  ],
})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  events: CalendarEvent[] = [];
  error = '';
  progresses: Progress[] = [];
  trackings: Tracking[] = [];
  progress: Progress | undefined;
  selectedDay = dayjs();

  constructor(
    private readonly statisticService: StatisticService,
    private readonly route: ActivatedRoute
  ) {}

  get viewDateFormat() {
    return dayjs(this.viewDate).format('MMMM YYYY');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.statisticService
      .getProgressess(dayjs(this.viewDate).format('YYYY-MM'))
      .subscribe({
        next: (progresses) => {
          this.progresses = progresses;
          this.events = [];

          for (const progress of progresses) {
            progress.trackings.forEach((tracking) => {
              this.events.push({
                start: dayjs(progress.date).toDate(),
                end: dayjs(progress.date).toDate(),
                title: (tracking as Tracking).exercise?.name ?? '',
                allDay: true,
              });
            });
          }

          this.route.queryParamMap.subscribe((map) => {
            if (map.get('open') === 'true') this.onDayClicked();
          });
        },
        error: (error) => (this.error = error.error?.message ?? error.message),
      });
  }

  onPrevious() {
    this.viewDate = dayjs(this.viewDate).subtract(1, 'month').toDate();
    this.getData();
  }

  onNext() {
    this.viewDate = dayjs(this.viewDate).add(1, 'month').toDate();
    this.getData();
  }

  onDayClicked(event?: any) {
    this.trackings = [];
    this.selectedDay = dayjs(event?.day?.date);
    
    this.progress = this.progresses.find((_progress) =>
      dayjs(_progress.date).isSame(this.selectedDay, 'day')
    );

    if (!this.progress) return;

    this.trackings = this.progress.trackings as Tracking[];
  }

  get dayFormatted() {
    return this.selectedDay.format('DD/MM/YYYY');
  }

  get time() {
    if (!this.progress) return '';

    return dayjs()
      .startOf('day')
      .add(this.progress.time, 'second')
      .format('HH:mm:ss');
  }

  get volume() {
    let result = 0;

    for (const tracking of this.trackings) {
      const progress = tracking.progress ?? [];

      for (const entry of progress)
        result += (entry?.weight ?? 0) * (entry?.reps ?? 0);
    }

    return result;
  }
}
