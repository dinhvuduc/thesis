import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise2 } from '../../types/exercise';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Tracking } from '../../types/tracking';
import { InputComponent } from '../input/input.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TrackingService } from '../../services/tracking.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  remixMenuFill,
  remixMenuLine,
  remixSettings2Fill,
  remixSettings3Line,
} from '@ng-icons/remixicon';
import { MenuService } from '../../services/menu.service';
import { take } from 'rxjs';
import { ExpansionComponet } from '../expansion/expansion.component';

@Component({
  templateUrl: './exercise.component.html',
  standalone: true,
  selector: 'app-exercise',
  imports: [
    NgIf,
    UpperCasePipe,
    NgFor,
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    NgIconComponent,
    ExpansionComponet,
    NgClass,
  ],
  viewProviders: [provideIcons({ remixMenuLine })],
})
export class ExerciseComponent implements OnInit {
  private _tracking: Tracking | undefined;

  @Input() index: number = 1;
  @Input() exercise: Exercise2 | undefined;
  @Input() set tracking(tracking: Tracking | undefined) {
    this._tracking = tracking;

    this.formArr.clear();

    this.setArray.forEach((_, setIndex) => {
      // const test = [];

      // if (tracking?.progress) test = tracking?.progress;

      // => (tracking?.progress ?? []

      this.formArr.push(
        this.fb.group({
          weight: [(tracking?.progress ?? [])[setIndex]?.weight ?? 0],
          reps: [(tracking?.progress ?? [])[setIndex]?.reps ?? 0],
        })
      );

      const shouldDisable =
        (tracking?.progress ?? [])[setIndex]?.weight &&
        (tracking?.progress ?? [])[setIndex]?.reps;

      if (shouldDisable) {
        const group = this.formArr.at(setIndex);

        group.get('weight')?.disable();
        group.get('reps')?.disable();

        this.checked[setIndex] = Boolean(shouldDisable);
      }
    });
  }
  @Input() options: any[] = [];
  @Input() openExpansion = false;
  @Input() clickable = false;
  @Input() selected = false;
  @Input() readonly = false;
  @Output() choose = new EventEmitter<Exercise2>();
  @Output() setModified = new EventEmitter<void>();

  get tracking() {
    return this._tracking;
  }

  form: FormGroup;
  error = '';
  checked: boolean[] = [];

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly fb: FormBuilder,
    private readonly trackingService: TrackingService,
    private readonly menu: MenuService
  ) {
    this.form = this.fb.group({
      arr: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.trackingService.confirm$.subscribe(async () => {
      if (!this._tracking) return;

      for (const [i, _]
        of new Array(this._tracking.sets).fill(0).entries()) {
        await this.onCheck(i, true);
      }
    });
  }

  getYoutubeUrl(exercise: Exercise2) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(exercise.video);
  }

  get setArray() {
    const sets = this._tracking ? this._tracking.sets : 0;

    return new Array(sets).fill(0);
  }

  get sets() {
    if (this._tracking) return this._tracking.sets;

    return this.exercise?.sets ?? 0;
  }

  get reps() {
    if (this._tracking) return this._tracking.reps;

    return this.exercise?.reps ?? 0;
  }

  get formArr() {
    return this.form.get('arr') as FormArray;
  }

  async onCheck(index: number, checked: boolean) {
    return new Promise<void>((resolve, reject) => {
      const group = this.formArr.at(index);

      if (checked) {
        group.get('weight')?.disable();
        group.get('reps')?.disable();

        if (!this._tracking) return;

        this.trackingService
          .saveTrackingProgress(
            this._tracking._id,
            index,
            Number(group.get('weight')?.value),
            Number(group.get('reps')?.value)
          )
          .subscribe({
            next: () => {
              resolve();
            },
            error: (error) => {
              this.error = error.error?.message ?? error.message;

              reject();
            },
          });
      } else {
        group.get('weight')?.enable();
        group.get('reps')?.enable();
      }

      this.checked[index] = checked;
    });
  }

  async onOpenMenu(event: MouseEvent) {
    const Component = await import('./menu/menu.component').then(
      (c) => c.ExerciseMenuComponent
    );

    const { x, y, width, height } = (
      event.target as HTMLElement
    ).getBoundingClientRect();

    this.menu.open(Component, x + width + 20, y + height);
    this.menu.data = {
      id: this._tracking?._id,
      options: this.options,
    };
  }

  onChooseExercise() {
    if (!this.clickable) return;

    this.choose.emit(this.exercise);
  }

  onAddSet() {
    if (!this._tracking) return;

    this.trackingService.addSet(this._tracking._id).subscribe({
      next: () => {
        this.setModified.emit();
      },
      error: (error) => {
        this.error = error.error?.message ?? error.message;
      },
    });
  }

  onDeleteSet(index: number) {
    if (!this._tracking) return;

    this.trackingService.deleteSet(this._tracking._id, index).subscribe({
      next: () => {
        this.setModified.emit();
      },
      error: (error) => {
        this.error = error.error?.message ?? error.message;
      },
    });
  }
}
