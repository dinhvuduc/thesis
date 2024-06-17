import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../components/input/input.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { PopupService } from '../../../../services/popup.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExerciseService } from '../../../../services/exercise.service';
import { NgFor } from '@angular/common';

@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
})
export class CreateExerciseComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private readonly popup: PopupService,
    private readonly fb: FormBuilder,
    private readonly exerciseService: ExerciseService
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      equipment: ['', Validators.required],
      target: ['', Validators.required],
      relatedTarget: ['', Validators.required],
      video: [''],
      instructions: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.popup.data);

    for (const instruction of this.popup.data.instructions) {
      this.instructionsFormArray.push(this.fb.control(instruction));
    }
  }
  onCancel() {
    this.popup.closePopup();
  }

  onSubmit() {
    this.loading = true;

    if (!this.data)
      this.exerciseService.createExercise(this.formGroup.value).subscribe({
        next: () => {
          this.loading = false;
          this.popup.closePopup();
          this.popup.closing$.next();
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.loading = false;
        },
      });
    else
      this.exerciseService
        .updateExercise(this.data._id, this.formGroup.value)
        .subscribe({
          next: () => {
            this.loading = false;
            this.popup.closePopup();
            this.popup.closing$.next();
          },
          error: (error) => {
            this.errorMessage = error.error.message;
            this.loading = false;
          },
        });

    this.popup.data = undefined;
  }
  get data() {
    return this.popup.data;
  }

  get invalid() {
    return this.formGroup.invalid;
  }

  get instructionsFormArray() {
    return this.formGroup.get('instructions') as FormArray;
  }

  onAddInstruction() {
    this.instructionsFormArray.push(this.fb.control(''));
  }

  get instructions() {
    return this.instructionsFormArray.controls;
  }

  onDeleteInstructionPoint(index: number) {
    this.instructionsFormArray.removeAt(index);
  }
}
