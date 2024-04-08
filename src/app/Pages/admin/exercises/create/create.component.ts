import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../components/input/input.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { PopupService } from '../../../../services/popup.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExerciseService } from '../../../../services/exercise.service';

@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
})
export class CreateExerciseComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private readonly popup: PopupService,
    private readonly fb: FormBuilder,
    private readonly exerciseService:ExerciseService,
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      equipment: ['', Validators.required],
      target: ['', Validators.required],
      relatedTarget: ['', Validators.required],
    });
  }
  ngOnInit(): void {
      this.formGroup.patchValue(this.popup.data);
  }
  onCancel() {
    this.popup.closePopup();
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.exerciseService.createExercise(this.formGroup.value).subscribe();
    this.popup.data = undefined;
  }
  get data(){
    return this.popup.data;
  }
}
