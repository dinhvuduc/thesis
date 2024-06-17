import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { PopupService } from '../../../../services/popup.service';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  templateUrl: './delete.component.html',
  standalone: true,
  imports: [ButtonComponent],
})
export class DeleteExerciseComponent {
  errorMessage = '';
  loading = false;

  constructor(
    private readonly popup: PopupService,
    private readonly exerciseService: ExerciseService
  ) {}

  get data() {
    return this.popup.data;
  }

  onCancel() {
    this.popup.closePopup();
  }

  onConfirm() {
    this.loading = true;

    this.exerciseService.deleteExercise(this.data._id).subscribe({
      next: () => {
        this.popup.closePopup();
        this.popup.closing$.next();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.loading = false;
      },
    });
  }
}
