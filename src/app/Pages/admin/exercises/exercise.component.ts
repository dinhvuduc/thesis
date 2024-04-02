import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercise.service';
import { NgFor } from '@angular/common';
import { Exercise2 } from '../../../types/exercise';
import { PopupService } from '../../../services/popup.service';

@Component({
  templateUrl: './exercise.component.html',
  standalone: true,
  imports:[NgFor]
})
export class ExercisePageComponet implements OnInit {
 exercises:Exercise2[] =[];
  constructor(private readonly exerciseService: ExerciseService, private readonly popupService:PopupService) {}

  ngOnInit(): void {
    this.exerciseService.getExercise().subscribe((exercises)=>{
this.exercises = exercises;

    });
  }
  onNewExercises(){
this.popupService.opened = !this.popupService.opened;
  }
}
