import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { Tracking } from '../../types/tracking';
import { ExerciseComponent } from '../../components/exercise/exercise.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixCalendar2Line } from '@ng-icons/remixicon';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ExerciseService } from '../../services/exercise.service';
import { PopupService } from '../../services/popup.service';
import { take } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { TargetsComponent } from './targets/targets.component';
import { Progress } from '../../types/progress';
import { Router } from '@angular/router';
import { CongratComponent } from './congrat/congrat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
dayjs.extend(customParseFormat);

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ExerciseComponent,
    ButtonComponent,
    NgIconComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss',
  viewProviders: [provideIcons({ remixCalendar2Line })],
})
export class TrackingComponent implements OnInit {
  private _intervalId: any;

  trackings: Tracking[] = [];
  progress: Progress | undefined;

  currentDate = dayjs();
  error = '';

  options: any[] = [];
  time = 0;
  startedAt: dayjs.Dayjs | undefined;

  showDate = false;
  date: string | undefined;

  confirmReset = false;

  constructor(
    private readonly trackingService: TrackingService,
    private readonly exerciseService: ExerciseService,
    private readonly popupService: PopupService,
    private readonly menu: MenuService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.options = [
      {
        label: 'Delete',
        onClick: () => {
          this.trackingService.deleteTracking(this.menu.data.id).subscribe({
            next: () => {
              this.menu.close();
              this.getTrackingExercises();
            },
            error: (error) => {
              this.error = error.error?.message ?? error.message;
            },
          });
        },
      },
    ];
  }

  ngOnInit(): void {
    this.getTrackingExercises();
  }

  getTrackingExercises() {
    this.trackingService
      .getTrackingExercises(new Date().toISOString())
      .subscribe({
        next: (progress) => {
          this.progress = progress;
          this.trackings = progress.trackings as Tracking[];

          this.checkProgressTime();
        },
        error: () => {},
      });
  }

  get currentDateFormatted() {
    return this.currentDate.format('YYYY-MM-DD');
  }

  onNavigate(isNext: boolean) {
    this.onCurrentDateChange(
      isNext
        ? this.currentDate.add(1, 'day')
        : this.currentDate.subtract(1, 'day')
    );
  }

  get canNext() {
    return this.currentDate.isBefore(dayjs().subtract(1, 'day'));
  }

  get maxDate() {
    return dayjs().format('YYYY-MM-DD');
  }

  onDateChange(event: Event) {
    const date = (event.target as HTMLInputElement).value;

    this.onCurrentDateChange(dayjs(date, 'YYYY-MM-DD'));
  }

  onCurrentDateChange(date: Dayjs) {
    this.currentDate = date;
    this.trackingService
      .getTrackingExercises(this.currentDate.toISOString())
      .subscribe({
        next: (progress) => {
          this.progress = progress;
          this.trackings = progress.trackings as Tracking[];

          this.checkProgressTime();
        },
        error: (error) => {
          this.error = error.error?.message ?? '';
        },
      });
  }

  onAddExercisesBtnClick() {
    this.popupService.componentRef = TargetsComponent;
    this.popupService.opened = true;

    this.popupService.closing$.subscribe(() => {
      this.getTrackingExercises();
    });
  }
  get isToday() {
    return this.currentDate.diff(dayjs(), 'days') === 0;
  }

  onSubmit() {
    if (!this.progress) return;

    clearInterval(this._intervalId);
    this._intervalId = undefined;

    this.trackingService.submit(this.progress._id).subscribe({
      next: () => {
        this.trackingService.confirm$.next();
        this.getTrackingExercises();

        this.popupService.componentRef = CongratComponent;
        this.popupService.opened = true;
      },
      error: (error) => {
        this.error = error.error?.message ?? '';
      },
    });
  }

  onTimerStart() {
    if (!this.progress) return;

    this.startedAt = dayjs(this.progress.startAt);
    this.time = dayjs().diff(this.startedAt, 'seconds');

    if (!this._intervalId)
      this._intervalId = setInterval(() => {
        this.time = this.time + 1;
        // this.cdr.markForCheck();
      }, 1000);

    if (!this.progress.startAt)
      this.trackingService.startTracking(this.progress._id).subscribe({
        next: () => {
          this.getTrackingExercises();
        },
        error: (error) => {
          this.error = error.error?.message ?? '';
        },
      });
  }

  get timeFormatted() {
    if (!this.startedAt || !this.time) return '00:00:00';

    const hour = this.startedAt
      .add(this.time, 'second')
      .diff(this.startedAt, 'hours')
      .toString()
      .padStart(2, '0');
    const minute = (
      this.startedAt.add(this.time, 'second').diff(this.startedAt, 'minutes') %
      60
    )
      .toString()
      .padStart(2, '0');
    const second = (
      this.startedAt.add(this.time, 'second').diff(this.startedAt, 'seconds') %
      60
    )
      .toString()
      .padStart(2, '0');

    return `${hour}:${minute}:${second}`;
  }

  checkProgressTime() {
    if (!this.progress) return;

    clearInterval(this._intervalId);
    this._intervalId = undefined;

    if (this.progress.startAt && !this.progress.time && this.isToday)
      this.onTimerStart();
    else {
      this.startedAt = dayjs(this.progress.startAt);
      this.time = this.progress.time;
    }
  }

  get hasStarted() {
    return !!this.progress?.startAt;
  }

  get hasSubmitted() {
    return !!this.progress?.time;
  }

  onConfirmAddFromDate() {
    this.trackingService
      .getExercisesFromDate(this.date ?? dayjs().format('YYYY-MM-DD'))
      .subscribe({
        next: () => this.getTrackingExercises(),
        error: (error) => {
          this.error = error.error?.message ?? '';
        },
      });
  }

  onReset() {
    if (!this.progress) return;

    this.trackingService.reset(this.progress._id).subscribe({
      next: () => {
        this.getTrackingExercises();
        this.confirmReset = false;
      },
      error: (error) => {
        this.error = error.error?.message ?? '';
      },
    });
  }
}
