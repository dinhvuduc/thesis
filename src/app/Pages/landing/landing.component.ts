import { Component, ViewChild, ViewChildren } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import { ExerciseService } from '../../services/exercise.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Exercise } from '../../types/exercise';
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
    SelectComponent,NgFor, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {
  selectedWorkoutType: WorkoutType | undefined ; 
  selectedGoal: WorkoutGoal | undefined;
  selectedOptions: number[] = [];
 generatedExercises: Exercise[] = []
  form: FormGroup;

  @ViewChild('muscleGroupSelect') muscleGroupSelect: SelectComponent | undefined;
  
  constructor(
    private readonly excerciseService: ExerciseService,
private readonly fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      target: ['', Validators.required],
      goal: this.fb.control('', Validators.required),
    })
  }
  //inject exercise service dat ten la exerciseService
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
  onSelectGoal(goal: WorkoutGoal) {
    this.selectedGoal = goal;

    const ctrl = this.form.get('goal') as FormControl;
    ctrl.setValue(goal);
  }

  checkSelectedGoal(goal: WorkoutGoal) {
    return this.selectedGoal === goal ? 'transparent' : 'black';
  }

  onSelectOption(index: number) {
    // TODO: limit only 3 selected options
    
    const newState = [...this.selectedOptions];
    const _index = newState.indexOf(index);

    if (_index !== -1) newState.splice(_index, 1);
    else newState.push(index);

    this.selectedOptions = newState;
  }
  onGenerate() {
    // this.form.get('target')?.setValue('push');
    console.log(this.form.value)
    this.generatedExercises = this.excerciseService.generateExercises(this.form.value.target, this.form.value.goal);
  }
}
