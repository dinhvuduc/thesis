import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercise.service';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { PopupService } from '../../../services/popup.service';
import { TrackingService } from '../../../services/tracking.service';
import { TrackingPreviousComponent } from '../previous/previous.component';
import { ListComponent } from '../list/list.component';

@Component({
  templateUrl: './targets.component.html',
  standalone: true,
  imports: [NgFor, ButtonComponent],
})
export class TargetsComponent implements OnInit {
  targets: string[] = [];
  error = '';

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly popup: PopupService,
    private readonly trackingService: TrackingService
  ) {}

  ngOnInit(): void {
    this.exerciseService.getTargets().subscribe({
      next: (targets) => {
        this.targets = targets;
      },
      error: (error) => {
        this.error = error.error?.message ?? '';
      },
    });
  }

  onChooseTarget(target: string) {
    const type = this.popup.data.type;

    this.popup.closePopup();

    this.exerciseService.getExercisesByTarget(target).subscribe({
      next: (exercises) => {
        this.popup.opened = true;
        this.popup.componentRef = ListComponent;
        this.popup.data = exercises;
      },
      error: (error) => {
        this.error = error.error?.message ?? '';
      },
    });

      // this.trackingService.getPreviousTrackings(target).subscribe({
      //   next: (trackings) => {
      //     this.popup.opened = true;
      //     this.popup.componentRef = TrackingPreviousComponent;
      //     this.popup.data = {
      //       target,
      //       trackings,
      //     };
      //     this.popup.width = '800px';
      //   },
      //   error: (error) => {
      //     this.error = error.error?.message ?? '';

      //     if (this.error === 'No previous trackings')
      //       this.exerciseService.getExercisesByTarget(target).subscribe({
      //         next: (exercises) => {
      //           this.popup.opened = true;
      //           this.popup.componentRef = ListComponent;
      //           this.popup.data = exercises;
      //         },
      //         error: (error) => {
      //           this.error = error.error?.message ?? '';
      //         },
      //       });
      //   },
      // });
  }
}
