import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  private _onChange: any | undefined;
  private _ontouch: any | undefined;
  @Input() type: string = 'text';
  @Input() placeholder: string | undefined;
  @Input() showLabel = false;

  value = '';

  constructor(@Self() @Optional() private readonly ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._ontouch = fn;
  }

  onChange(event: Event) {
    if (this._onChange)
      this._onChange((event.target as HTMLInputElement).value);
  }

  onTouch() {
    if (this._ontouch) this._ontouch();
  }

  get name() {
    return this.ngControl.name;
  }

  get isEmpty() {
    return this.ngControl.control?.errors ? ['required'] : false;
  }

  get touched() {
    return this.ngControl.control?.touched;
  }

  get disabled() {
    return this.ngControl.control?.disabled;
  }
}
