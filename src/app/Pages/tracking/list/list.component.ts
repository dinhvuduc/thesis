import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { Exercise2 } from '../../../types/exercise';
import { ExerciseComponent } from '../../../components/exercise/exercise.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { TrackingService } from '../../../services/tracking.service';

@Component({
  templateUrl: './list.component.html',
  standalone: true,
  imports: [ExerciseComponent, NgFor, ButtonComponent],
})
export class ListComponent implements OnInit {
  exercises: Exercise2[] = [];
  error = '';
  loading = false;
  selected: number[] = [];

  constructor(
    private readonly popup: PopupService,
    private readonly trackingSerice: TrackingService
  ) {}

  ngOnInit(): void {
    this.exercises = this.popup.data;
  }

  onConfirm() {
    this.loading = true;

    this.trackingSerice
      .trackExercises(
        this.exercises
          .filter((_, index) => this.selected.includes(index))
          .map((ex) => ({
            _id: ex._id,
            reps: 0,
            sets: 0,
          }))
      )
      .subscribe({
        next: () => {
          this.popup.closePopup();
          this.popup.closing$.next();
        },
        error: (error) => {
          this.error = error.error?.message ?? error.message;

          this.loading = false;
        },
      });
  }

  onChooseExercise(index: number) {
    const added = this.selected.includes(index);

    if (added) this.selected = this.selected.filter((i) => i !== index);
    else this.selected = [...this.selected, index];
  }
}
