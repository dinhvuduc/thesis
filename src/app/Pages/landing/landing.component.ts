import { Component, ViewChild, ViewChildren } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
type WorkoutType = 'broSplit' | 'individual' | 'upperLower' | 'bodyBuilder'

type WorkoutGoal = 'strength' | 'cardiovascular' | 'growth'

const MUSCLE_GROUPS: Record<WorkoutType, string[]> = {
  individual: ['Biceps', 'Triceps', 'Chest'],
  broSplit: ['Push', 'Pull', 'Legs'],
  upperLower: ['Upper', 'Lower'],
  bodyBuilder: ['Chest', 'Back', 'Shoulder'],
};
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    StepComponent,
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {
  selectedWorkoutType: WorkoutType | undefined ; 
  selectedGoal: WorkoutGoal | undefined;

  @ViewChild('muscleGroupSelect') muscleGroupSelect: SelectComponent | undefined;
  
  onClick(workoutType: WorkoutType) {
    this.selectedWorkoutType = workoutType;

    this.muscleGroupSelect?.onReset();

  }

  checkSelectedWorkoutType(workoutType:WorkoutType){
    return this.selectedWorkoutType === workoutType ? 'transparent' : 'black';
  }

  get muscleGroups() {
    if (this.selectedWorkoutType === undefined) return [];
    return MUSCLE_GROUPS[this.selectedWorkoutType];
  }

  onselectgoal(goal: WorkoutGoal){
    this.selectedGoal = goal;

  }

  checkSelectedGoal(goal:WorkoutGoal){
    return this.selectedGoal === goal ? 'transparent' : 'black';
  }

}
