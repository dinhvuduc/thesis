
import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgFor, FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor { 
  private _onChange: any;
  private _onTouch: any;

  @Input() options: string[] = [];
  value=""

  constructor(@Self() @Optional() private readonly ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  registerOnChange(fn: any): void {
      this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this._onTouch = fn;
  }

  writeValue(obj: any): void {
      this.value = obj;
  }

  onReset(){

    this.value = "";
  }

  onChange() {
    if (this._onChange) this._onChange(this.value);
  }
}
