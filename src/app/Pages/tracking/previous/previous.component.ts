import { Component } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { Tracking } from '../../../types/tracking';
import { ExerciseComponent } from '../../../components/exercise/exercise.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { TrackingService } from '../../../services/tracking.service';

@Component({
  templateUrl: './previous.component.html',
  standalone: true,
  imports: [ExerciseComponent, NgFor, ButtonComponent],
})
export class TrackingPreviousComponent {
  error = '';
  loading = false;

  constructor(
    private readonly popup: PopupService,
    private readonly trackingService: TrackingService
  ) {}

  get trackings(): Tracking[] {
    return this.popup.data.trackings;
  }

  onConfirm() {
    this.loading = true;

    // this.trackingService
    //   .getExercisesFromDate(this.popup.data.target)
    //   .subscribe({
    //     next: () => {
    //       this.popup.closing$.next();
    //       this.popup.closePopup();
    //     },
    //     error: (error) => {
    //       this.loading = false;
    //       this.error = error.error?.message ?? error.message;
    //     },
    //   });
  }
}
