import { Component, OnInit, ViewChild } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import { ExerciseService } from '../../services/exercise.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Exercise2 } from '../../types/exercise';
import { TrackingService } from '../../services/tracking.service';
import { Router } from '@angular/router';
import { ExerciseComponent } from '../../components/exercise/exercise.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
type WorkoutType = 'broSplit' | 'individual' | 'upperLower' | 'bodyBuilder';

type WorkoutGoal = 'gain weight' | 'lose weight';

const MUSCLE_GROUPS: Record<WorkoutType, string[]> = {
  individual: [
    'Biceps',
    'Triceps',
    'Chest',
    'Back',
    'Shoulders',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Calves',
    'Abs',
  ],
  broSplit: ['Push', 'Pull', 'Legs'],
  upperLower: ['Upper', 'Lower'],
  bodyBuilder: ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Abs'],
};
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    StepComponent,
    ButtonComponent,
    SelectComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
    NgIf,
    ExerciseComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingPageComponent implements OnInit {
  selectedWorkoutType: WorkoutType | undefined;
  selectedGoal: WorkoutGoal | undefined;
  selectedOptions: number[] = [];
  generatedExercises: Exercise2[] = [];
  form: FormGroup;

  generating = false;
  error = '';

  user: User | undefined;

  @ViewChild('muscleGroupSelect') muscleGroupSelect:
    | SelectComponent
    | undefined;

  constructor(
    private readonly excerciseService: ExerciseService,
    private readonly fb: FormBuilder,
    private readonly trackingService: TrackingService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.group({
      target: ['', Validators.required],
      goal: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  //inject exercise service dat ten la exerciseService
  onClick(workoutType: WorkoutType) {
    this.selectedWorkoutType = workoutType;

    this.muscleGroupSelect?.onReset();
  }

  checkSelectedWorkoutType(workoutType: WorkoutType) {
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
    this.generating = true;
    this.generatedExercises = [];
    this.error = '';

    this.excerciseService
      .generateExercises(
        this.form.value.target,
        this.form.value.goal,
        this.user?.age,
        this.user?.weight,
        this.user?.height
      )
      .subscribe({
        next: (exercise) => {
          this.generatedExercises = exercise;
          this.generating = false;
        },
        error: (error) => {
          this.error = 'Please try again later!';
          this.generating = false;
        },
      });
  }

  onTrackExercises() {
    this.trackingService
      .trackExercises(
        this.generatedExercises.map((exercise) => ({
          _id: exercise._id,
          reps: exercise.reps,
          sets: exercise.sets,
        }))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/', 'tracking']);
        },
        error: (error) => {
          this.error = error.error.message;
          this.router.navigate(['/sign-in']);
        },
      });
  }
}
