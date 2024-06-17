import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercise.service';
import { NgFor } from '@angular/common';
import { Exercise2 } from '../../../types/exercise';
import { PopupService } from '../../../services/popup.service';
import { CreateExerciseComponent } from './create/create.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { DeleteExerciseComponent } from './delete/delete.component';
import { take } from 'rxjs';

@Component({
  templateUrl: './exercise.component.html',
  standalone: true,
  imports: [NgFor, ButtonComponent],
})
export class ExercisePageComponet implements OnInit {
  exercises: Exercise2[] = [];
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.exerciseService.getExercise().subscribe((exercises) => {
      this.exercises = exercises;
    });

    this.popupService.closing$.subscribe(() => {
      this.exerciseService.getExercise().subscribe((exercises) => {
        this.exercises = exercises;
      });
    });
  }
  onNewExercises() {
    // const Component = import('./create/create.component').then(
    //   (c) => c.CreateExerciseComponent
    // ); //component reference
    this.popupService.opened = !this.popupService.opened;
    this.popupService.componentRef = CreateExerciseComponent;
  }
  onUpdate(exercise: Exercise2) {
    this.popupService.opened = true;
    this.popupService.componentRef = CreateExerciseComponent;

    this.popupService.data = exercise;
  }

  onDelete(exercise: Exercise2) {
    this.popupService.opened = true;
    this.popupService.componentRef = DeleteExerciseComponent;

    this.popupService.data = {
      _id: exercise._id,
      name: exercise.name,
    };
  }
}
